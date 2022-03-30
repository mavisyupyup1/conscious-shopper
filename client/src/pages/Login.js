import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Card, Badge, Button, Col, Container, Form, Row } from 'react-bootstrap';

import './Login.css'


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);  
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
   
<>

    {/* <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>  */}

    <Container className='h-100'>
      <Row className="justify-content-md-center">
        <Col xs="6" className='mobile-login'>
          <Form onSubmit={handleFormSubmit} className="p-2 m-1 border border-dark border-5 rounded">

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>

              <Form.Control 
                name="email" 
                type="email" 
                //id="email" 
                value={formState.email} 
                onChange={handleChange} 
                placeholder="Enter email" 
              />

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <Form.Control 
                name="password"
                type="password" 
                //id="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Password" />

            </Form.Group>
            <Button variant="primary" type="submit" className=''>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>



    </>


  );
};

export default Login;
