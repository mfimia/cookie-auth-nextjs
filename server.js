// create nextjs custom server
// use same origin (port) as external server for dev
const express = require("express");
// const Error = require("next/error");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const isDevEnv = process.env.NODE_ENV !== "production";
const app = next({ dev: isDevEnv });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // apply proxy in dev mode
    if (isDevEnv)
      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        })
      );
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, () => {
      console.log("> Ready on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });
