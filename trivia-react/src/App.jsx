import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import './App.css';
import {Container} from 'semantic-ui-react'

import {Trivia, Login, Navbar, Leaderboard, Register, MyScores} from './components/index';

class App extends Component {

  state = {
    scores:[]
  }

  render() {

    // const navbar = props.loggedIn;
    // if (navbar){
    //   <Navbar></Navbar>
    // } else {
    //     }

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
              <Route exact path="/trivia/my-scores" render={() => (
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
                  <Navbar></Navbar>
                  <MyScores></MyScores>
                </Container>
                )}
              />
              <Route exact path="/trivia/leaderboard" render={() => (
                <Container style={{marginTop: '1em', marginBottom:'2em', textAlign:'center'}}>
                  <Navbar></Navbar>
                  <Leaderboard></Leaderboard>
                </Container>
                )}
              />
              <Route exact path="/trivia/home" render={() => (
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
