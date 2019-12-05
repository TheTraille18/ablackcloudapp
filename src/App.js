import React, {useState} from 'react';
import Menu from "./components/Menu"
import './App.css';

function App() {
  return (
    <div className="App" style = {{ backgroundImage: 'url(./black-cloud.jpg)'}}>
      <img src={require('./black-cloud.jpg')} width="1000" height="500"/>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <Menu />
        </p>
      </header>
    </div>
  );
}

export default App;
