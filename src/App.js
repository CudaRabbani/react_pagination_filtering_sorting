import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Movies from "./components/movies";

class App extends Component {
  render() {
    return (
      <main role="main" className="container m-2">
          <h2>Movies List</h2>
          <Movies />
      </main>
    );
  }
}

export default App;
