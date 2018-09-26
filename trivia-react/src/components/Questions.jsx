import React, { Component } from 'react';
import './Questions.css';
import {Container, Header, Table, Label} from 'semantic-ui-react'
import axios from 'axios';
import Moment from 'moment';

class Questions extends Component {

  state = {
    leaderboard:[],
  }

  fetchLeaderboard(){
    axios.get("http://127.0.0.1:5000/score/1")
      .then(res => {
        const leaderboard = res.data.map(obj => obj);
        console.log(leaderboard);
        if (!leaderboard.length) {
          alert("Server error");
        } else {
          this.setState({leaderboard});
        }
      });
  }

  componentDidMount(){
    this.fetchLeaderboard();
  }


  render() {
    return (
      <div className="Questions">
        <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
          <Header as='h1'>Questions</Header>
          <p>All scores made by $USERNAME</p>
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
                  {index === 0 &&
                  <Label ribbon>Best</Label>
                  }
                  {score.username}
                </Table.Cell>
                <Table.Cell>
                  {score.score}
                </Table.Cell>
                <Table.Cell>
                  {Moment(score.created).format('d/MM/YYYY')}
                </Table.Cell>
              </Table.Row>
              )}
            </Table.Body>

          </Table>
      </Container>     </div>
      );
}
}

export default Questions;
