import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';
import {Container} from 'semantic-ui-react'
import {Trivia, Login, Navbar, Leaderboard, Register, MyScores} from './components/index';

class App extends Component {

  componentDidMount() {

    // const isLoggedIn = false;
    // if (!isLoggedIn) {
    // 	this.props.history.push('/login');
    // }
  }


  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Container style={{marginTop: '7em'}}>
            <Switch>
              <Route path="/login" render={() => (
                <Login></Login>
              )}
            />
            <Route path="/register" render={() => (
              <Register></Register>
            )}
          />
          <Route exact path="/my-scores" render={() => (
            <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
              <Navbar></Navbar>
              <MyScores></MyScores>
            </Container>
          )}
        />
        <Route exact path="/leaderboard" render={() => (
          <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
            <Navbar></Navbar>
            <Leaderboard></Leaderboard>
          </Container>
        )}
      />
      <Route exact path="/home" render={() => (
        <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
          <Navbar></Navbar>
          <Trivia></Trivia>
        </Container>
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
