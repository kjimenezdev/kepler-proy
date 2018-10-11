import React, { Component } from 'react';
import './Register.css';
import {Link, withRouter} from 'react-router-dom'
import {Grid, Segment, Message, Header, Image, Button, Form} from 'semantic-ui-react'
import axios from 'axios';

class Register extends Component {

  state = {
    username:"",
    email:"",
    password:""
  }

  constructor(props){
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.goHome =  this.goHome.bind(this);
  }


  goHome(){
    this.props.history.push('/home');
  }

  doRegister(user){
    axios.post("http://127.0.0.1:5000/user/", user)
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
      }).catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  handleUsernameChange(e) {
    let username = e.target.value
    this.setState({username});
  }


  handlePasswordChange(e) {
    let password = e.target.value;
    this.setState({password});
  }

  handleEmailChange(e) {
    let email = e.target.value;
    this.setState({email});
  }

  handleSubmit(e) {
    let username = this.state.username;
    let password = this.state.password;
    console.log(username);
    console.log(password);
    // alert('A name was submitted: ' + this.state.username + "\n" + this.state.password);
    let user = {username:username, password:password};
    this.doRegister(user);
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
            <Header as='h1' textAlign='center'><b>Register</b>
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
                  fluid icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address' />
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
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/login'>Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>

    );
}
}

export default withRouter(Register);
