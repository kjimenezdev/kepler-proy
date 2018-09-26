import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom'
import {Container, Menu, Image} from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/trivia/home' header>
              <Image size='mini' src='http://www.keplergrp.com/favicon.ico' style={{ marginRight: '1.5em' }} />
              Kepler Onboarding Trivia
            </Menu.Item>
            <Menu.Item as={Link} to='/trivia/leaderboard'>Leaderboard</Menu.Item>
            <Menu.Item as={Link} to='/trivia/my-scores'>My Scores</Menu.Item>
            <Menu.Item as={Link} to='/trivia/questions'>All Questions</Menu.Item>
            <Menu.Item position="right"> Logout </Menu.Item>

          </Container>
        </Menu>
      </div>
      );
}
}

export default Navbar;
