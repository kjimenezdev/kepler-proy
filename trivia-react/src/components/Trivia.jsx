import React, { Component } from 'react';
import './Trivia.css';
import {Container, Header, Button, Form, Radio} from 'semantic-ui-react'
import axios from 'axios';

class Trivia extends Component {

  state = {
    score: 0,
    questions: [],
    current: {
      options:[]
    },
    curr_idx: 0,
  }

  handleOptionchange(idx, e){
    let curr_idx = this.state.curr_idx;
    let questions = this.state.questions;
    questions[curr_idx].user_choice = idx;
    // console.log(questions[curr_idx].user_choice);
    this.setState({questions});
  }

  resetAppState(){
    let curr_idx = 0
    let score = 0
    let current = this.state.questions[0];
    this.setState({current});
    this.setState({curr_idx});
    this.setState({score});
  }

  handleNext(e){
    let curr_idx = this.state.curr_idx;
    console.log(curr_idx);
    let questions = this.state.questions;
    let question = questions[curr_idx];
    if (curr_idx === questions.length-1){
      alert("Thanks for participating! Your score is " + this.state.score);
      this.submitScore();
      this.resetAppState();
    } else {
      if (question.user_choice != null){
        curr_idx += 1;
        let current = questions[curr_idx];
        this.setState({questions});
        this.setState({curr_idx});
        this.setState({current});
        if (question.correct_idx === question.user_choice){
          let score = this.state.score + 100;
          this.setState({score});
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
  }

  submitScore(){
    let score = this.state.score;
    axios.post("http://127.0.0.1:5000/score", score)
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

  render() {
    return (
      <div className="">
        <Container style={{ marginTop: '7em' }}>
              <div>
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'right'}}>
                  <Header as='h2'>Score: {this.state.score} </Header>
                </Container>
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
                  <Header as='h1'>Trivia App</Header>
                  <p>Trivia App to practice all the concepts during Kepler Onboarding</p>
                </Container>
                <Container key={this.state.current.id} style={{marginTop: '3em', marginBottom:'2em', textAlign:'left'}}>
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
        </Container>
      </div>
      );
}
}

export default Trivia;
