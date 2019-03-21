import React, {Component} from 'react';
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import styled from 'styled-components';

const AuthButton = styled.button`
  background: #5101d1;
  font: inherit;
  border: 1px solid #5101d1;
  border-radius: 3px;
  padding: 0.25rem 1rem;
  margin-right: 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.26);
  color: white;
  cursor: pointer;
`;

const AuthForm = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
`;

const AuthInput = styled.input`
  width: 100%;
  display: block;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            firstName
            lastName
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const data = resData.data.login;
        if (data.token) {
          this.props.login({
            token: data.token,
            userId: data.userId,
            tokenExpiration: data.tokenExpiration,
            firstName: data.firstName,
            lastName: data.lastName,
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Please Login</h1>
        <AuthForm onSubmit={this.submitHandler}>
          <div style={{marginBottom: '10px'}}>
            <label htmlFor="email">E-Mail</label>
            <AuthInput type="email" id="email" ref={this.emailEl}/>
          </div>
          <div style={{marginBottom: '10px'}}>
            <label htmlFor="password">Password</label>
            <AuthInput type="password" id="password" ref={this.passwordEl}/>
          </div>
          <div>
            <AuthButton type="submit">Submit</AuthButton>
          </div>
        </AuthForm>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(login(data)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

