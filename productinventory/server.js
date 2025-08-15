const htt = require("http");
const fs = require("fs");
const ax = require("axios");
const port = 3131;
const productfile = "product.json";
let userfile = "user.json";
if (!fs.existsSync(productfile)) {
  fs.writeFileSync(productfile, "[]");
}
if (!fs.existsSync(userfile)) fs.writeFileSync(userfile, "[]");
const server = htt
  .createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync("./login.html"));
    }
    if (req.url === "/add.html" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync("./add.html"));
    }
    if (req.url === "/output.css" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/css" });
      res.end(fs.readFileSync("./output.css"));
    }
    if (req.url === "/register.html" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync("./register.html"));
    }
    if (req.url === "/login.html" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync("./login.html"));
    }
    if (req.url === "/index.html" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync("./index.html"));
    }
    if (req.url === "/register" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        console.log(body);
        const { username, password } = JSON.parse(body || "{}");
        const data = JSON.parse(fs.readFileSync(userfile));
        const user = data.find((u) => u.username === username);

        if (user) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("User");
        } else {
          data.push({ username, password });
          fs.writeFileSync(userfile, JSON.stringify(data, null, 2));
          res.writeHead(200, { "content-type": "text/plain" });
          res.end("registration successfull!");
        }
      });
      return;
    }
    if (req.url === "/login" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          const { username, password } = JSON.parse(body || "{}");
          const data = JSON.parse(fs.readFileSync(userfile, "utf-8"));
          const user = data.find((u) => u.username === username);

          if (!user) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({ success: false, message: "User not found" })
            );
          }

          if (user.password === password) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: "Success" }));
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ success: false, message: "Invalid password" })
            );
          }
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ success: false, message: "Invalid JSON format" })
          );
        }
      });
    }
    if (req.url === "/search" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { nam } = JSON.parse(body || "{}");
        const users = JSON.parse(fs.readFileSync(productfile, "utf-8"));
        let fing = users.find((u) => u.name === nam);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ num: fing.num, name: fing.name, price: fing.price })
        );
      });
    }
    if (req.url === "/Add" && req.method === "POST") {
      let body = "";
      let num = Math.floor(Math.random() * 1000) + 1;
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { name, price } = JSON.parse(body || "{}");
        console.log(body);
        const users = JSON.parse(fs.readFileSync(productfile));
        const user = users.find((u) => u.name === name && u.price === price);

        if (user) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: "Product already exists",
            })
          );
        } else {
          users.push({ num, name, price });

          fs.writeFileSync(productfile, JSON.stringify(users, null, 2));
          res.writeHead(200, { "content-type": "text/plain" });
          res.end("Product added successfull!");
        }
      });
      return;
    }
  })
  .listen(port);
console.log("SERVER CONNECTED....");
