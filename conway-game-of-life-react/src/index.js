/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { 
  Container, Header, Content, Footer, Navbar, Nav, Form, Toggle, Modal
} from 'rsuite';
//import reportWebVitals from './reportWebVitals';
import UserCircle from '@rsuite/icons/legacy/UserCircle'
import { Popover, Whisper } from 'rsuite';
import { Button, ButtonToolbar } from 'rsuite';


import './index.less';
import './index.css';

import GameApp from './Components/GameApp';
import { MainMenu } from './Components/MainMenu'
import { NewGameSetup } from './Components/NewGameSetup';
import { makeApiRequest } from './Utils'


const Index = () => {
  const [UserDialogOpen, setUserDialogOpen] = React.useState(false);
  const handleOpen = () => setUserDialogOpen(true);
  const handleClose = () => setUserDialogOpen(false);
  
  const UserDialog = () => {
    const [loggingIn, setLogingIn] = useState(false)
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      rememberLogin: false,
    })

    const validateUsername = () => formData.username !== ""
    const validatePassword = () => formData.password !== ""

    return (
      <Modal className="rs-theme-dark" open={UserDialogOpen} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form formValue={formData} onChange={(data) => {setFormData(data)}}>
            <Form.Group controlId="username">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control name="username" errorPlacement="bottomEnd"
                errorMessage={validateUsername() ? "" : "Required"} 
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name="password" errorPlacement="bottomEnd" type='password'
                errorMessage={validatePassword() ? "" : "Required"} 
              />
            </Form.Group>
            <Form.Group controlId='rememberLogin'>
              <Form.ControlLabel>Remember login</Form.ControlLabel>
              <Form.Control name='rememberLogin' accepter={Toggle} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Sign Up
          </Button>
          <Button appearance="primary"
            disabled={!validateUsername() || !validatePassword() || loggingIn}
            onClick={async () => {
              //setLogingIn(true)
              /*
              */
              const user = (await makeApiRequest("POST", "http://localhost:4000/users/login", {
                username: formData.username,
                password: formData.password,
              })).data[0]
              if (user !== undefined) {
                user.password = formData.password
                user.rememberLogin = formData.rememberLogin
                localStorage.setItem("userCredentials", JSON.stringify(user))
                console.log(`Welcome ${user.name}!`)
                handleClose()
              } else {
                console.log(`Wrong uwername or password`)
                setLogingIn(false)
              }
            }} 
          >
            Log In
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <BrowserRouter>
      <Container className="rs-theme-dark">
        <Header>
          <Navbar>
            <Navbar.Brand href="#">Conway</Navbar.Brand>
            <Nav>
              <Nav.Item>Main Menu</Nav.Item>
              <Nav.Item>Save Game</Nav.Item>
            </Nav>
            <Nav pullRight>
              <Nav.Item onClick={handleOpen}>
                <UserCircle />
              </Nav.Item>
              <Nav.Item>Settings</Nav.Item>
            </Nav>
          </Navbar>
        </Header>
        <Content className="modal-container">
          <Routes>
            <Route exaxt path='/' element={<MainMenu />} />
            <Route exaxt path='/NewGame' element={<NewGameSetup />} />
            <Route exaxt path='/Game' element={<GameApp />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
          <UserDialog />
        </Content>
        <Footer>
          {"By 71walceli"}
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
//reportWebVitals();
