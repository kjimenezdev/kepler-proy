import React, { Component } from 'react';
import './Register.css';
import {Grid, Segment, Message, Header, Image, Button, Form} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Register extends Component {





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
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

              <Button color='orange' fluid size='large'>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>

    );
}
}

export default Register;
