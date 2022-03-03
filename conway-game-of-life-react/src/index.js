import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import './index.css';
import GameApp from './GameApp';
import { MainMenu } from './MainMenu'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NewGameSetup } from './NewGameSetup';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* TODO Add header */}
      <main>
        <Routes>
          <Route exaxt path='/' element={ <MainMenu /> } />
          <Route exaxt path='/NewGame' element={ <NewGameSetup /> } />
          <Route exaxt path='/Game' element={ <GameApp /> } />
          <Route path="*" element={ <p>Not Found</p> } />
        </Routes>
      </main>
    {/* TODO Add footer */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
