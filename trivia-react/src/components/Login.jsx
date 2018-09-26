import React, { Component } from 'react';
import './Login.css';
import {Link, withRouter} from 'react-router-dom'
import {Grid, Segment, Message, Header, Image, Button, Form} from 'semantic-ui-react'
import axios from 'axios';

class Login extends Component {

  state = {
      username:"",
      password:""
  }

  constructor(props){
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.goHome =  this.goHome.bind(this);
  }


  goHome(){
    this.props.history.push('/trivia/home');
  }

  doLogin(user){
    axios.post("http://127.0.0.1:5000/user/auth", user)
      .then(res => {
        const user = res.data;
        console.log(user);
        if (!user) {
          alert("Server error");
        } else {
          let jsonuser = JSON.stringify(user);
          localStorage.setItem('user', jsonuser)
          let savedUser = localStorage.getItem('user');
          console.log(savedUser)
          this.goHome();
        }

      });
  }

  handleUsernameChange(e) {
    let username = e.target.value;
    this.setState({username});
  }


  handlePasswordChange(e) {
    let password = e.target.value;
    this.setState({password});
  }

  handleSubmit(e) {
    let username = this.state.username;
    let password = this.state.password;
    console.log(username);
    console.log(password);
    // alert('A name was submitted: ' + this.state.username + "\n" + this.state.password);
    let user = {username:username, password:password};
    this.doLogin(user);
    // event.preventDefault();
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
          height: 100%;
          }
          `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src='http://www.keplergrp.com/wp-content/uploads/2015/12/keplerlogo.png'/>
            <Header as='h1' textAlign='center'><b>Login</b>
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={this.state.value}
                  onChange={this.handleUsernameChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={this.state.value}
                  onChange={this.handlePasswordChange.bind(this)}
                />

              <Button color='orange' fluid size='large'
                onClick={this.handleSubmit.bind(this)}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>

    );
}
}

export default withRouter(Login);
