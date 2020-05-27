import "./stylesheets/main.css";
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import { remote } from "electron";
import jetpack from "fs-jetpack";
import { greet } from "./hello_world/hello_world";
import env from "env";
import { readdir, stat } from "fs";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

const manifest = appDir.read("package.json", "json");

document.getElementById("app").style.display = "block"

const listNode = document.getElementById("file-list");

const folderPath = app.getAppPath();

// const createChild = (path, fileName, fileStats = {}) => {
//   readdir(folderPath, (error, files) => {
//     if (error) {
//       console.error(error);
//     } else {
//       files.forEach((file) => {
//         const listLi = document.createElement("li");
//         const navButton = document.createElement("button");
//         const statSpan = document.createElement("span");
    
//         statSpan.textContent = fileStats.creationTime + " " + fileStats.filesize;
//         navButton.textContent = file;
    
//         listLi.appendChild(navButton);
//         listLi.appendChild(statSpan);
//         listNode.appendChild(listLi);
//       });
//     }
//   })
//   const{ creationTime, filesize } = fileStats;
//   let textInfo = " ";
//   if (typeof creationTime !== "undefined") {
//     textInfo += " " + creationTime;
//   }
//   if (typeof filesize !== "undefined") {
//     textInfo += " " + filesize;
//   }
    
//   statSpan.textContent = textInfo;
//   navButton.textContent = fileName;
//   navButton.onclick = (_event) => updateList(path + '/' + fileName);
// }

const createChild = (path, fileName, fileStats = {}) => {

  const listLi = document.createElement("li");
  const navButton = document.createElement("button");
  const statSpan = document.createElement("span");

  statSpan.textContent = fileStats.creationTime + " " + fileStats.filesize;

  const{ creationTime, filesize } = fileStats;
  let textInfo = " ";
  if (typeof creationTime !== "undefined") {
    textInfo += " " + creationTime;
  }
  if (typeof filesize !== "undefined") {
    textInfo += " " + filesize;
  }

  statSpan.textContent = textInfo;
  navButton.textContent = fileName;
  navButton.onclick = (_event) => updateList(path + '/' + fileName);

  listLi.appendChild(navButton);
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
      createChild(path, "..");
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

// openFile (path: string): void {
//   shell.openItem(path)
// }

updateList(folderPath);