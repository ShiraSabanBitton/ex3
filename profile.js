const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/profile", (req, res) => {
  let id = req.query.id;

  let profilePath = path.join(__dirname, "private", id);

  let biofilePath = path.join(profilePath, "bio.txt");
  let bioText = fs.readFileSync(biofilePath, "utf8");

  const htmlBioContent = bioText.split(":");

  let titlefilePath = path.join(profilePath, "title.txt");
  let fullTitleText = fs.readFileSync(titlefilePath, "utf8");
  const splittedFullTitleText = fullTitleText.split("\r\n");
  let titleText = splittedFullTitleText[0];
  let descText = splittedFullTitleText[1];

  let text1filePath = path.join(profilePath, "text1.txt");
  let text1Text = fs.readFileSync(text1filePath, "utf8");

  let text2filePath = path.join(profilePath, "text2.txt");
  let text2Text = fs.readFileSync(text2filePath, "utf8");

  let text3filePath = path.join(profilePath, "text3.txt");
  let text3Text = fs.readFileSync(text3filePath, "utf8");

  let text4filePath = path.join(profilePath, "text4.txt");
  let text4Text = fs.readFileSync(text4filePath, "utf8");

  let text5filePath = path.join(profilePath, "text5.txt");
  let text5Text = fs.readFileSync(text5filePath, "utf8");

  res.render("profile.ejs", {
    id,
    descText,
    titleText,
    htmlBioContent,
    text1Text,
    text2Text,
    text3Text,
    text4Text,
    text5Text,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
