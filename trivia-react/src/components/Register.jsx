import React, { Component } from 'react';
import './Register.css';
import {
  Container,
  Header,
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <MetaTags>
        </MetaTags>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h2'>Register 1</Header>
          <p>Trivia Register to practice all the concepts during Kepler Onboarding</p>
        </Container>
      </div>
      );
}
}

export default Register;
