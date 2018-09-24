import React, { Component } from 'react';
import './MyScores.css';
import {Container, Header, Table, Label} from 'semantic-ui-react'
import axios from 'axios';

class MyScores extends Component {

  state = {
    leaderboard:[],
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
      <div className="MyScores">
        <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
          <Header as='h1'>MyScores</Header>
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
      </Container>     </div>
      );
}
}

export default MyScores;
