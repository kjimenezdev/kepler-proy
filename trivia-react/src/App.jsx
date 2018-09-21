import React, { Component } from 'react';
import {Link, Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';
import {Container, Grid, Segment, Message, Table, Label, Header, Image, Menu, Button, Form, Radio} from 'semantic-ui-react'
import axios from 'axios';
import {Trivia} from './components/Trivia';

class App extends Component {

  state = {
    score: 0,
    questions: [],
    current: {
      options:[]
    },
    curr_idx: 0,
    leaderboard:[],
    scores:[]
  }

  handleOptionchange(idx, e){
    let curr_idx = this.state.curr_idx;
    let questions = this.state.questions;
    questions[curr_idx].user_choice = idx;
    // console.log(questions[curr_idx].user_choice);
    this.setState({questions});
  }

  resetAppState(){
    this.state.curr_idx = 0;
    this.score = 0;
    let current = this.state.questions[0];
    this.setState({current});
  }

  handleNext(e){
    let curr_idx = this.state.curr_idx;
    console.log(curr_idx);
    let questions = this.state.questions;
    let question = questions[curr_idx];
    if (curr_idx === questions.length-1){
      alert("Thanks for participating! Your score is " + this.state.score);
      this.resetAppState();
    } else {
      if (question.user_choice != null){
        curr_idx += 1;
        let current = questions[curr_idx];
        this.setState({questions});
        this.setState({curr_idx});
        this.setState({current});
        if (question.correct_idx === question.user_choice){
          this.state.score += 100;
          console.log(this.state.score);
          alert("Correct!");
        } else {
          alert("Incorrect!");
        }
      } else {
        alert("Pick an option");
      }
    }

  }

  componentDidMount(){
    this.fetchQuestions();
    this.fetchLeaderboard();
  }

  submitScore(){
    let score = this.state.score;
    axios.post("http://127.0.0.1:5000/question/all")
      .then(res => {
        const questions = res.data.map(obj => obj);
        console.log(questions);
        if (!questions.length) {
          alert("Server error");
        } else {
          let current = questions[0];
          console.log(current);
          this.setState({questions});
          this.setState({current});
          console.log(this.state);
        }
      });
  }

  fetchQuestions(){
    axios.get("http://127.0.0.1:5000/question/all")
      .then(res => {
        const questions = res.data.map(obj => obj);
        console.log(questions);
        if (!questions.length) {
          alert("Server error");
        } else {
          let current = questions[0];
          console.log(current);
          this.setState({questions});
          this.setState({current});
          console.log(this.state);
        }
      });
  }

  fetchLeaderboard(){
    axios.get("http://127.0.0.1:5000/score")
      .then(res => {
        const questions = res.data.map(obj => obj);
        console.log(questions);
        if (!questions.length) {
          alert("Server error");
        } else {
          let current = questions[0];
          console.log(current);
          this.setState({questions});
          this.setState({current});
          console.log(this.state);
        }
      });
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Container style={{marginTop: '7em'}}>
            <Switch>
              <Route path="/trivia" render={() => (
                <Menu fixed='top' inverted>
                  <Container>
                    <Menu.Item as={Link} to='/home' header>
                      <Image size='mini' src='http://www.keplergrp.com/favicon.ico' style={{ marginRight: '1.5em' }} />
                      Kepler Onboarding Trivia
                    </Menu.Item>
                    <Menu.Item as={Link} to='/trivia/leaderboard'>Leaderboard</Menu.Item>
                    <Menu.Item as={Link} to='/trivia/my-scores'>My Scores</Menu.Item>
                  </Container>
                </Menu>
                )}
              />
              <Route exact path="/login" render={() => (
                <div className='login-form'>
                  {/*
                  Heads up! The styles below are necessary for the correct render of this example.
                  You can do same with CSS, the main idea is that all the elements up to the `Grid`
                  below must have a height of 100%.
                  */}
                  <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                    height: 100%;
                    }
                    `}</style>
                  <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                      <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> Log-in to your account
                      </Header>
                      <Form size='large'>
                        <Segment stacked>
                          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                          <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                          />

                        <Button color='teal' fluid size='large'>
                          Login
                        </Button>
                      </Segment>
                    </Form>
                    <Message>
                      New to us? <a href='#'>Sign Up</a>
                    </Message>
                  </Grid.Column>
                </Grid>
              </div>
              )}
            />
            <Route exact path="/trivia/my-scores" render={() => (
              <div>
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
                  <Header as='h1'>My scores</Header>
                  <p>All of my scores</p>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {this.state.leaderboard.map((score, index) =>
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>Best</Label>
                          {score.username}
                        </Table.Cell>
                        <Table.Cell>
                          {score.score}
                        </Table.Cell>
                        <Table.Cell>
                          {score.date}
                        </Table.Cell>
                      </Table.Row>
                      )}
                    </Table.Body>

                  </Table>
                </Container>
              </div>
              )}
            />
            <Route exact path="/trivia/leaderboard" render={() => (
              <div>
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
                  <Header as='h1'>Leaderboard</Header>
                  <p>All scores</p>
                </Container>
              </div>
              )}
            />
            <Route exact path="/home" render={() => (
              <div>
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
                  <Header as='h1'>Trivia App</Header>
                  <p>Trivia App to practice all the concepts during Kepler Onboarding</p>
                </Container>
                <Container key={this.state.current.id} style={{marginTop: '3em', marginBottom:'2em'}}>
                  <Header as='h2' style={{marginBottom:'2em'}} >{this.state.current.content} </Header>
                  {this.state.current.options.map((option, index) =>
                  <Form.Field key={option.id}>
                    <Radio
                      label={option.content}
                      name='radioGroup'
                      value={index}
                      checked={index === this.state.current.user_choice}
                      onChange={this.handleOptionchange.bind(this, index)}
                    />
                  </Form.Field>
                  )}
                  <Button
                    style={{marginTop:'2em' }}
                    floated='right'
                    content='Next'
                    icon='right arrow'
                    onClick={this.handleNext.bind(this)}
                    labelPosition='right' />
                </Container>
              </div>

              )}
            />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
    );
}
}

export default App;
