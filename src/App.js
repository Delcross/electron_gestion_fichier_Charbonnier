import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import { greet } from "./hello_world/hello_world";
import env from "env";
import { readdir, stat } from "fs";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

// const osMap = {
//   win32: "Windows",
//   darwin: "macOS",
//   linux: "Linux"
// };

document.getElementById("app").style.display = "block"
// document.getElementById("greet").innerHTML = greet();
// document.getElementById("os").innerHTML = osMap[process.platform];
// document.getElementById("author").innerHTML = manifest.author;
// document.getElementById("env").innerHTML = env.name;
// document.getElementById("electron-version").innerHTML = process.versions.electron;

const listNode = document.getElementById("file-list");

const folderPath = app.getAppPath();

const createChild = (path, fileName, fileStats = {}) => {
  const listLi = document.createElement("li");
  const fileButton = document.createElement("button");
  const statSpan = document.createElement("span");

  const{ creationTime, filesize } = fileStats;
  let textInfo = " ";
  if (typeof creationTime !== "undefined") {
    textInfo += " " + creationTime;
  }
  if (typeof filesize !== "undefined") {
    textInfo += " " + filesize;
  }

  statSpan.textContent = textInfo;
  fileButton.textContent = fileName;
  fileButton.onclick = (_event) => updateList(path + '/' + fileName);

  listLi.appendChild(fileButton);
  listLi.appendChild(statSpan);
  listNode.appendChild(listLi);
}

const updateList = (path) => {
  console.log(path);
  readdir(path, (error, files) => {
    if(error) {
      console.error(error);
    } else {
      while (listNode.firstChild) {
        listNode.removeChild(listNode.firstChild);
      }
      createChild(path, "<");
      files.forEach((fileName) => {
        stat(`${path}/${fileName}`, (error, fileStats) => {
          if (error) {
            console.error(error);
          } else {
            createChild(path, fileName, fileStats)
          }
        });
      });
    }
  })
}

updateList(folderPath);