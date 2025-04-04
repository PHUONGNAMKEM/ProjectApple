// const express = require("express");
// const app = require("../src/server");

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.listen(3000, () => console.log("Server ready on port 3000."));

// module.exports = app;

// api/index.js
const app = require("../src/server"); // Require ứng dụng từ src/server.js

module.exports = app;