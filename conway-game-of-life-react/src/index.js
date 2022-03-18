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
  
  const UserDialog = () => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    })
    const UsernamePasswordValidationMessage = "Required"
    const [usernameError, setUsernameError] = useState(true)
    const [passwordError, setPasswordError] = useState(true)
  
    const handleChange = (data) => {
      setFormData(data); 
    };

    const validateUsername = () => formData.username === ""
    const validatePassword = () => formData.password === ""

    return (
      <Popover title="Log In" className="rs-theme-dark">
        {/*
        BUG: This actually throws an error on rendering. AFAIK, no error in my code...

        Stack trace:

          Uncaught Error: Argument appears to not be a ReactComponent. Keys: child,updatePosition
            at findHostInstanceWithWarning (react-dom.development.js:25383:1)
            at findDOMNode (react-dom.development.js:26067:1)
            at getDOMNode (getDOMNode.js:17:1)
            at Transition.getChildElement (Transition.js:190:1)
            at Transition.performEnter (Transition.js:205:1)
            at Transition.componentDidMount (Transition.js:90:1)
            at commitLifeCycles (react-dom.development.js:20663:1)
            at commitLayoutEffects (react-dom.development.js:23426:1)
            at HTMLUnknownElement.callCallback (react-dom.development.js:3945:1)
            at Object.invokeGuardedCallbackDev

          The above error occurred in the <Transition> component:
            at Transition (http://localhost:3000/static/js/bundle.js:93612:30)
            at http://localhost:3000/static/js/bundle.js:93519:27
            at http://localhost:3000/static/js/bundle.js:99046:70
            at http://localhost:3000/static/js/bundle.js:102991:25
            at http://localhost:3000/static/js/bundle.js:99246:70
            at http://localhost:3000/static/js/bundle.js:101688:22
            at a
            at http://localhost:3000/static/js/bundle.js:100407:25
            at http://localhost:3000/static/js/bundle.js:98909:25
            at http://localhost:3000/static/js/bundle.js:98634:25
            at div
            at http://localhost:3000/static/js/bundle.js:98458:25
            at nav
            at http://localhost:3000/static/js/bundle.js:98781:25
            at header
            at http://localhost:3000/static/js/bundle.js:102052:27
            at section
            at http://localhost:3000/static/js/bundle.js:94098:25
            at Router (http://localhost:3000/static/js/bundle.js:89034:15)
            at BrowserRouter (http://localhost:3000/static/js/bundle.js:88510:5)
            at Index (http://localhost:3000/static/js/bundle.js:1046:67)
        */}
        <Form formValue={formData} onChange={(data) => {setFormData(data)}}>
          <Form.Group controlId="username">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="name" errorPlacement="bottomEnd"
              errorMessage={validateUsername() ? "Required" : ""} 
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="name" errorPlacement="bottomEnd" type='password'
              errorMessage={validatePassword() ? "Required" : ""} 
            />
          </Form.Group>
          <Form.Group controlId='rememberLogin'>
            <Form.ControlLabel>Remember login</Form.ControlLabel>
            <Form.Control name='randomGrid' accepter={Toggle} />
          </Form.Group>
          <Form.Group controlId='formActions'>
            <Button appearance='primary' color="green" type="submit"
              disabled={validateUsername() && validatePassword()} 
              onClick={() => {}}
            >
              Log in
            </Button>
          </Form.Group>
        </Form>
      </Popover>
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
              <Nav.Item>
                <Whisper placement="auto" ref={triggerRef} trigger="click"
                  speaker={UserDialog}
                >
                  <UserCircle />
                </Whisper>
              </Nav.Item>
              <Nav.Item>Settings</Nav.Item>
            </Nav>
          </Navbar>
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
