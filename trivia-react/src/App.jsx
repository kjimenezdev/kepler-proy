import React, { Component } from 'react';
import './App.css';
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu
} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import Question from 'components/Question.jsx';

class App extends Component {

  state = {
    questions: []
  }


  componentDidMount(){
    axios.get("http://127.0.0.1/question")
      .then(res => {
        const questions = res.data.data.children.map(obj => obj.data);
        this.setState({questions});
      });
  }

  render() {
    return (
      <div className="App">
        <MetaTags>
        </MetaTags>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src='http://www.keplergrp.com/favicon.ico' style={{ marginRight: '1.5em' }} />
              Kepler Onboarding Trivia
            </Menu.Item>
            <Menu.Item as='a'>Leaderboard</Menu.Item>
            <Dropdown item simple text='Settings'>
              <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Trivia App</Header>
          <p>Trivia App to practice all the concepts during Kepler Onboarding</p>
        </Container>
        <Container>
          {this.state.questions.map(question =>
          <Question value={question}></Question>
          )}

        </Container>
      </div>
      );
}
}

export default App;
