import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import DisplayListItem from './Component/DisplayListItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<DisplayListItem/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
