import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import sirv from "sirv";
const serve = sirv(fileURLToPath(new URL("../dist", import.meta.url)), {
  etag: true,
});
const server = createServer((req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end();
    return;
  }
  serve(req, res, () => {
    res.writeHead(404);
    res.end("Not found");
  });
});
server.requestTimeout = 20000;
server.headersTimeout = 15000;
server.listen(
  Number(process.env.PORT || 3000),
  process.env.HOST || "0.0.0.0",
  () => {
    console.log(
      `Carson’s portfolio is listening on port ${process.env.PORT || 3000}.`,
    );
  },
);
