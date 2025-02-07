import React from 'react';

import Container from 'react-bootstrap/Container';

import '../App.css';



const HelloWorld = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Hello World</h1>
      Just a test   
    </Container>
  </Container>
);

export default HelloWorld;
