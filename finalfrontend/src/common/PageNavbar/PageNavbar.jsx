import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './PageNavbar.css';
import { useSelector, useDispatch } from "react-redux";
import { logout, userData, login } from "../../pages/userSlice";
import { logUser, registerUser } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";

export const PageNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // REDUX
  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);
  const navigate = useNavigate();

  const logOutMe = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [userError, setUserError] = useState({
    nameError: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
  });

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = validator(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    errorCheck({ target: { name: 'name', value: user.name } });
    errorCheck({ target: { name: 'username', value: user.username } });
    errorCheck({ target: { name: 'email', value: user.email } });
    errorCheck({ target: { name: 'password', value: user.password } });

    for (let test in userError) {
      if (userError[test] !== "") {
        return;
      }
    }

    try {
      const response = await registerUser({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
      });

      console.log(response.data);

      setShowRegister(false);
      await handleLoginSubmit(e);

    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await logUser({
        email,
        password,
      });

      dispatch(login({ TOKEN: response.data.token, ...response.data }));

      console.log('Login successful:', response.data);
      console.log('Redux state:', rdxCredentials);

      setShowLogin(false);

      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-warning navbar-design">
        <Container>
          <Navbar.Brand href="/">
            <img src='./src/assets/img/logo.png' alt='Logo' className='logo-navbar'></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/ranking">Ranking</Nav.Link>
              <Nav.Link href="/achievements">Achievements</Nav.Link>
              {rdxCredentials?.credentials.token ? (
                <>
                  <Nav.Link href="/profile">{rdxCredentials.credentials.name}</Nav.Link>
                  {rdxCredentials.credentials.role === 'admin' && (
                    <span className='admin-panel-text'><Nav.Link href="/admin">Admin</Nav.Link></span>
                  )}
                  <Nav.Link onClick={logOutMe}>Logout</Nav.Link>
                </>
              ) : (
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLoginClick}>Login</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleRegisterClick}>Register</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={showLogin} onHide={() => setShowLogin(false)} placement="end" className="design-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='offcanvas-design'>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">EMAIL:</label>
                <input type="text" id="email" name="email" className="form-control" onBlur={errorCheck} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">PASSWORD:</label>
                <input type="password" id="password" name="password" className="form-control" onBlur={errorCheck} />
              </div>
              <Button variant="warning" type="submit" className="d-block mx-auto border border-dark">
                LOGIN
              </Button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={showRegister} onHide={() => setShowRegister(false)} placement="end" className="design-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Register</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='offcanvas-design'>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">NAME:</label>
                <input type="text" id="name" name="name" className="form-control" onBlur={errorCheck} />
                {userError.nameError && (
                  <div className="error-message">{userError.nameError}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">USERNAME:</label>
                <input type="text" id="username" name="username" className="form-control" onBlur={errorCheck} />
                {userError.usernameError && (
                  <div className="error-message">{userError.usernameError}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">EMAIL:</label>
                <input type="text" id="email" name="email" className="form-control" onBlur={errorCheck} />
                {userError.emailError && (
                  <div className="error-message">{userError.emailError}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">PASSWORD:</label>
                <input type="password" id="password" name="password" className="form-control" onBlur={errorCheck} />
                {userError.passwordError && (
                  <div className="error-message">{userError.passwordError}</div>
                )}
              </div>
              <Button variant="warning" type="submit" className="d-block mx-auto border border-dark">
                REGISTER
              </Button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
