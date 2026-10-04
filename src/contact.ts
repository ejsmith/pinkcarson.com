export interface ContactMessage {
  name: string;
  email: string;
  business: string;
  message: string;
  website: string;
  captcha: string;
}

// The access key is a public form identifier. The recipient stays in Web3Forms.
export async function sendContactMessage(
  accessKey: string,
  fields: ContactMessage,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  if (!accessKey.trim())
    throw new Error("The contact form isn’t receiving messages yet. Please check back soon.");
  if (fields.website.trim())
    throw new Error("Your message couldn’t be sent. Please reload the page and try again.");
  if (!fields.captcha)
    throw new Error("Please complete the spam check before sending your message.");

  let response: Response;
  try {
    response = await fetcher("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey.trim(),
        name: fields.name.trim(),
        email: fields.email.trim(),
        business: fields.business.trim(),
        message: fields.message.trim(),
        subject: "A new hello from pinkcarson.com",
        from_name: "Pink Carson contact form",
        "h-captcha-response": fields.captcha,
        botcheck: false,
      }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("We couldn’t confirm your message was sent. Your note is still here; please try again later.");
  }

  if (response.status === 429)
    throw new Error("The form is receiving too many messages right now. Your note is still here; please try again later.");
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true)
    throw new Error("Your message couldn’t be sent. Your note is still here; please complete the spam check again and try later.");
}
