//Shira Saban Bitton - 316511658
//Fida Rabah - 204647911
//12/3/24
//The file is a Node.js script that creates a web server using the Express.js framework.
//It sets up routes to handle incoming HTTP requests, reads data from files, and renders dynamic content to be displayed on web pages.

// This line imports the Express.js framework.
//Express is a web application framework for Node.js that simplifies the process of building web applications and APIs by providing a robust set of features for handling HTTP requests, routing, middleware, and more.
const express = require("express");
//This line imports the built-in Node.js File System (fs) module.
//This module provides functions for working with the file system, allowing you to read from and write to files on your computer.
const fs = require("fs");
//This line imports the built-in Node.js Path module.
//This module provides utilities for working with file and directory paths.
//It helps in constructing absolute paths and resolving relative paths.
const path = require("path");
//This line creates an instance of the Express application by calling the express() function.
//This instance represents your web application and allows you to define routes, middleware, and other configurations.
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

//Listen on profile route and read the profile files accurding to the id that we get from the web
app.get("/profile", (req, res) => {
  let id = req.query.id;

  let profilePath = path.join(__dirname, "private", id);

  fs.readdir(profilePath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const textFiles = files.filter((file) => {
      return file.startsWith("text") && file.endsWith(".txt");
    });
    // read the files in the folder - GPT
    let contentFiles = [];
    textFiles.forEach((file) => {
      let filePath = path.join(profilePath, file);
      contentFiles.push(fs.readFileSync(filePath, "utf8"));
    });

    let biofilePath = path.join(profilePath, "bio.txt");
    let bioText = fs.readFileSync(biofilePath, "utf8");

    const htmlBioContent = bioText.split(":");

    let titlefilePath = path.join(profilePath, "title.txt");
    let fullTitleText = fs.readFileSync(titlefilePath, "utf8");
    const splittedFullTitleText = fullTitleText.split("\r\n");
    let titleText = splittedFullTitleText[0];
    let descText = splittedFullTitleText[1];

    //get profiles names - GPT
    const privateFolder = path.join(__dirname, "private");
    const filesInPri = fs.readdirSync(privateFolder);

    const profilesNames = [];
    for (let index = 0; index < filesInPri.length; index++) {
      const file = filesInPri[index];
      const filePath = path.join(privateFolder, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        profilesNames.push(file);
      }
    }

    res.render("profile.ejs", {
      id,
      descText,
      titleText,
      htmlBioContent,
      contentFiles,
      profilesNames,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
