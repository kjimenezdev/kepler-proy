import React, { Component } from 'react';
import './MyScores.css';
import {Container, Header, Table} from 'semantic-ui-react'
import axios from 'axios';
import Moment from 'moment';

class MyScores extends Component {

  state = {
    leaderboard:[]
  }

  fetchLeaderboard(){

    let savedUser = localStorage.getItem('user');
    let jsonUser = JSON.parse(savedUser);
    axios.get("http://127.0.0.1:5000/score/" + jsonUser.id)
      .then(res => {""
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
      <div className="MyScores">
        <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
          <Header as='h1'>MyScores</Header>
          <p>All scores made by me</p>
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
              <Table.Row key={index}>
                <Table.Cell>
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

export default MyScores;
