import React, { Component } from 'react';
import './App.css';
import FileTree from './Utilities/FileTree';
var remote = window.require('electron').remote;
var { dialog } = remote;

class App extends Component { 
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleOpenFolder}>Open Folder</button>
      </div>
    );
  }

  handleOpenFolder = () => {
    var directory = dialog.showOpenDialog({ properties: ['openDirectory']});

    if (directory && directory[0]){
      var fileTree = new FileTree(directory[0]);

      fileTree.build();

      console.log(fileTree);
    }

  }
}

export default App;