import React, { Component } from 'react';
import './Login.css';
import {
  Container,
  Header,
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <MetaTags>
        </MetaTags>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h2'>Login 1</Header>
          <p>Trivia Login to practice all the concepts during Kepler Onboarding</p>
        </Container>
      </div>
      );
}
}

export default Login;
