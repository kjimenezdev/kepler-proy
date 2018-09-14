import React, { Component } from 'react';
import './QuestionOption.css';
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';

class QuestionOption extends Component {
  render() {
    return (
      <div className="QuestionOption">
        <MetaTags>
        </MetaTags>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Trivia QuestionOption</Header>
          <p>Trivia QuestionOption to practice all the concepts during Kepler Onboarding</p>
        </Container>
      </div>
      );
}
}

export default QuestionOption;
