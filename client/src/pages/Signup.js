import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { Card, Badge, Button, Col, Container, Form, Row } from 'react-bootstrap';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    type: 'FREE'
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    const accountType = document.getElementById('type').value
    console.log(accountType)
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    
    

    {/* <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
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
              <label htmlFor="type">Choose An Account Type:</label>
              <select className="form-input" name="type" id="type" onChange={handleChange} value={formState.type}>
                <option value="FREE">Customer Account (Free)</option>
                <option value="PAID">Business Account ($1.99)</option>
              </select>
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main> */}

    <Container className='h-100'>
      <Row className="justify-content-md-center">
        <Col xs="6">
          <Form onSubmit={handleFormSubmit} className="p-2 m-1 border border-dark border-5 rounded">

            <Form.Group className="mb-3" controlId="username">
              <Form.Control 
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange} 
                placeholder="Username" 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">

              <Form.Control 
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="password">

              <Form.Control 
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Password" />

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="type">Choose Account Type</Form.Label>
              <Form.Select className="form-input" name="type" id="type" onChange={handleChange}>
                <option value="FREE">Customer Account (Free)</option>
                <option value="PAID">Business Account ($1.99)</option>
              </Form.Select>
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

export default Signup;
