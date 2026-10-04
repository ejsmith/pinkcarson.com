import test from "node:test";
import assert from "node:assert/strict";
import { sendContactMessage } from "../src/contact.ts";

const fields = {
  name: " Visitor ", email: "visitor@example.com", business: "",
  message: "A test message about Carson’s grooming work.", website: "", captcha: "test-token",
};
const response = (body, status = 200) => new Response(JSON.stringify(body), { status });

test("sends the visitor reply address and captcha without a recipient email", async () => {
  await sendContactMessage("public-form-id", fields, async (url, options) => {
    assert.equal(url, "https://api.web3forms.com/submit");
    assert.equal(options.method, "POST");
    const body = JSON.parse(options.body);
    assert.equal(body.access_key, "public-form-id");
    assert.equal(body.name, "Visitor");
    assert.equal(body.email, fields.email);
    assert.equal(body["h-captcha-response"], fields.captcha);
    assert.equal(body.botcheck, false);
    assert.equal(body.to, undefined);
    assert.equal(body.replyto, undefined);
    assert.equal(body.website, undefined);
    return response({ success: true });
  });
});

test("missing configuration, missing captcha, and honeypot never make a network request", async () => {
  const forbiddenFetch = async () => assert.fail("Unexpected request");
  await assert.rejects(sendContactMessage("", fields, forbiddenFetch), /isn’t receiving/);
  await assert.rejects(sendContactMessage("key", { ...fields, captcha: "" }, forbiddenFetch), /spam check/);
  await assert.rejects(sendContactMessage("key", { ...fields, website: "spam" }, forbiddenFetch), /couldn’t be sent/);
});

test("only a successful HTTP response with success true confirms delivery", async () => {
  for (const [body, status] of [[{ success: false }, 200], [{}, 200], [{ success: "true" }, 200], [{ success: true }, 500]]) {
    await assert.rejects(sendContactMessage("key", fields, async () => response(body, status)), /couldn’t be sent/);
  }
  await assert.rejects(sendContactMessage("key", fields, async () => new Response("<html>Gateway error</html>")), /couldn’t be sent/);
});

test("rate limits and provider errors return useful messages without provider details", async () => {
  await assert.rejects(sendContactMessage("key", fields, async () => response({}, 429)), /too many messages/);
  await assert.rejects(sendContactMessage("key", fields, async () => response({ success: false, message: "private provider detail" }, 400)), error => {
    assert.doesNotMatch(error.message, /private provider detail/);
    return true;
  });
});

test("network failures and timeouts never claim success or change the message", async () => {
  const before = structuredClone(fields);
  for (const error of [new TypeError("Failed to fetch"), new DOMException("Timed out", "TimeoutError")]) {
    await assert.rejects(sendContactMessage("key", fields, async () => { throw error; }), /couldn’t confirm/);
  }
  assert.deepEqual(fields, before);
});
