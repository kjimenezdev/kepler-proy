import React, { Component } from 'react';
import './Question.css';
import {
  Container,
  Header,
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';

class Question extends Component {
  render() {
    return (
      <div className="Question">
        <MetaTags>
        </MetaTags>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h2'>Question 1</Header>
          <p>Trivia Question to practice all the concepts during Kepler Onboarding</p>
        </Container>
      </div>
      );
}
}

export default Question;
