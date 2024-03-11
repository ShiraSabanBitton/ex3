const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/profile", (req, res) => {
  let id = req.query.id;
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
