import React, { Component } from 'react';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">todos</h1>
      </header>
      <Todo />
      <footer>
        <p className="tdfooter" >Double-click to edit a todo.</p>
      </footer>
    </div>
  );
}

export default App;
