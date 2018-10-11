import React, { Component } from 'react';
import './Navbar.css';
import {Link, withRouter} from 'react-router-dom'
import {Container, Menu, Image} from 'semantic-ui-react'

class Navbar extends Component {

  constructor(props){
    super(props);

    this.goLogin = this.goLogin.bind(this);
  }

  goLogin(){
    localStorage.removeItem('user')
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="Navbar">
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/home' header>
              <Image size='mini' src='http://www.keplergrp.com/favicon.ico' style={{ marginRight: '1.5em' }} />
              Kepler Onboarding Trivia
            </Menu.Item>
            <Menu.Item as={Link} to='/leaderboard'>Leaderboard</Menu.Item>
            <Menu.Item as={Link} to='/my-scores'>My Scores</Menu.Item>
            <Menu.Item onClick={this.goLogin.bind(this)}
              position="right"> Logout </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navbar);
