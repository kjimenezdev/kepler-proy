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
    this.props.history.push('/home');
  }

  doLogin(user){
    axios.post("http://127.0.0.1:5000/user/auth", user)
      .then(res => {
        const user = res.data;
        console.log(user);
        if (!user) {
          alert("Server error");
        } else {
          let jsonUser = JSON.stringify(user);
          localStorage.setItem('user', jsonUser);
          let savedUser = localStorage.getItem('user');
          console.log(savedUser)
          this.goHome();
        }
      }).catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 403)
            alert("The entered user does not exist")
          else
            alert("Server error")

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          alert("Server error")
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          alert("Error")
        }
        console.log(error.config);
        alert("Error")
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
    let user = {username:username, password:password};
    this.doLogin(user);
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
                  onChange={this.handleUsernameChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
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
