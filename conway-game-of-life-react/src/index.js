/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { 
  Container, Header, Content, Footer, Navbar, Nav, Form, InputGroup, InputNumber, Toggle, Modal
} from 'rsuite';
import reportWebVitals from './reportWebVitals';
import UserCircle from '@rsuite/icons/legacy/UserCircle'
import { Popover, Whisper } from 'rsuite';
import { Button, ButtonToolbar } from 'rsuite';


import './index.less';
import './index.css';

import GameApp from './Components/GameApp';
import { MainMenu } from './Components/MainMenu'
import { NewGameSetup } from './Components/NewGameSetup';


const Index = () => {
  const triggerRef = useRef()
  
  const [UserDialogOpen, setUserDialogOpen] = React.useState(false);
  const handleOpen = () => setUserDialogOpen(true);
  const handleClose = () => setUserDialogOpen(false);
  
  const UserDialog = () => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      rememberLogin: false,
    })
  
    const validateUsername = () => formData.username !== ""
    const validatePassword = () => formData.password !== ""

    return (
      <Modal className="rs-theme-dark" open={UserDialogOpen} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
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
            disabled={!validateUsername() || !validatePassword()}
            onClick={() => {
              //handleClose()
              console.log({formData: formData})
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
reportWebVitals();
