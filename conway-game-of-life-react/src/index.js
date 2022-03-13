/* eslint-disable array-callback-return */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container, Header, Content, Footer, Navbar, Nav, Dropdown } from 'rsuite';
import reportWebVitals from './reportWebVitals';

import './index.less';
import './index.css';

import GameApp from './Components/GameApp';
import { MainMenu } from './Components/MainMenu'
import { NewGameSetup } from './Components/NewGameSetup';


const Index = () => {
  const navItems = [
    {
      displayName: "Main Meno",
      href: "/",
    },
    {
      displayName: "Save Game",
      href: "/Manage",
    },
    {
      displayName: "About",
      href: "/About",
    },
  ]

  return (
    <BrowserRouter>
      <Container>
        <Header>
          <h3>Conway's Game of Life</h3>
          <nav style={{
            float: "right"
          }}>
            {" | "}
            <Link to="/">Main Meno</Link>
            {" | "}
            <Link to="/">Save Game</Link>
            {" | "}
            <Link to="/">About</Link>
            {" | "}
          </nav>
        </Header>
        <Content>
          <Routes>
            <Route exaxt path='/' element={<MainMenu />} />
            <Route exaxt path='/NewGame' element={<NewGameSetup />} />
            <Route exaxt path='/Game' element={<GameApp />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </Content>
        <Footer>
          By 71walceli
        </Footer>
      </Container>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
