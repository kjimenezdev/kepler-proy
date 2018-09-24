import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom'
import {Grid, Segment, Message, Header, Image, Button, Form} from 'semantic-ui-react'
import axios from 'axios';

class Login extends Component {

  constructor(props){
    super(props);

    this.state={
      username:"",
      password:""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  doLogin(user){
    axios.post("http://127.0.0.1:5000/user/auth", user)
      .then(res => {
        const user = res.data.map(obj => obj);
        console.log(user);
        if (!user) {
          alert("Server error");
        } else {
          localStorage.setItem(user ,'user')
          let savedUser = localStorage.getItem('user');
          console.log(savedUser)
          // let current = questions[0];
          // console.log(current);
          // this.setState({questions});
          // this.setState({current});
          // console.log(this.state);
        }
      });
  }


  handleChange(key, e) {
  //   // this.setState({key: event.target.value});
  //   console.log(event.target.value);
    // console.log(key);
    //
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.user + "\n" + this.state.password);
    event.preventDefault();
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
            <Header as='h1' textAlign='center'><b>Trivia</b>
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={this.state.value}
                  onChange={this.handleChange.bind(this, 'username')}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={this.state.value}
                  onChange={this.handleChange.bind(this, 'password')}
                />

              <Button color='orange' fluid size='large' type="submit">
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

export default Login;
