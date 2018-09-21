import React, { Component } from 'react';
import './Trivia.css';
import {
  Container,
  Header,
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';

class Trivia extends Component {
  render() {
    return (
      <div className="Trivia">
        <MetaTags>
        </MetaTags>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h2'>Trivia 1</Header>
          <p>Trivia Trivia to practice all the concepts during Kepler Onboarding</p>
        </Container>
      </div>
      );
}
}

export default Trivia;
