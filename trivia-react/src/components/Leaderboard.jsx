import React, { Component } from 'react';
import './Leaderboard.css';
import {
  Container,
  Header,
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';

class Leaderboard extends Component {
  render() {
    return (
      <div className="Leaderboard">
        <MetaTags>
        </MetaTags>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h2'>Leaderboard 1</Header>
          <p>Trivia Leaderboard to practice all the concepts during Kepler Onboarding</p>
        </Container>
      </div>
      );
}
}

export default Leaderboard;
