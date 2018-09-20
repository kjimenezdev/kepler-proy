import React, { Component } from 'react';
import {Link, Route, Router, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';
import {Container,Dropdown,Header, Image, Menu, Button, Form, Radio} from 'semantic-ui-react'
import MetaTags from 'react-meta-tags';
import axios from 'axios';

class App extends Component {

  state = {
    questions: [],
    current: {
      options:[]
    },
    curr_idx: 0
  }

  handleOptionchange(idx, e){
    let curr_idx = this.state.curr_idx;
    let questions = this.state.questions;
    questions[curr_idx].user_choice = idx;
    // console.log(questions[curr_idx].user_choice);
    this.setState({questions});
  }

  handleNext(e){
    let curr_idx = this.state.curr_idx;
    console.log
    let questions = this.state.questions;
    let question = questions[qidx];
    let curr_idx = this.state.curr_idx;
    if (question.user_choice != null){
      if (question.correct_idx === question.user_choice){
        let current = questions[qidx+1];
        this.setState({questions});
        this.setState({curr_idx});
        this.setState({current});
      } else {
        alert("Incorrect!");
      }
    } else {
      alert("Select a choice");
    }
  }

  componentDidMount(){
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

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as={Link} to='/home' header>
                <Image size='mini' src='http://www.keplergrp.com/favicon.ico' style={{ marginRight: '1.5em' }} />
                Kepler Onboarding Trivia
              </Menu.Item>
              <Menu.Item as={Link} to='/leaderboard'>Leaderboard</Menu.Item>
              <Dropdown item simple text='Settings'>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to='/my-scores'>My Scores</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/login' >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </Menu>
          <Container style={{marginTop: '7em', textAlign:'center'}}>
            <Switch>
              <Route exact path="/leaderboard" render={() => (
                <h2>Test</h2>
                )}
              />
            </Switch>
            <Header as='h1'>Trivia App</Header>
            <p>Trivia App to practice all the concepts during Kepler Onboarding</p>
          </Container>

           <Container style={{marginTop: '1em', marginBottom:'2em'}}>

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
          </Container>
          </div>
      </BrowserRouter>
      );
}
}

export default App;
