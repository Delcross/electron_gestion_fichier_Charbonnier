import React, { Component } from 'react';
import './App.css';

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
}

export default App;