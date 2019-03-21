import React, {Component} from 'react';
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import styled from 'styled-components';
import Login from "./Login";
import Signup from "./Signup";

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

class Auth extends Component {
  state = {
    isLogin: true
  };

  switchModeHandler = () => {
    this.setState(prevState => {
      return {isLogin: !prevState.isLogin};
    });
  };


  render() {
    return (
      <div>
        <AuthButton type="button" onClick={this.switchModeHandler}>
          Switch to {this.state.isLogin ? 'Signup' : 'Login'}
        </AuthButton>
        {this.state.isLogin ? <Login /> : <Signup switchModeHandler={this.switchModeHandler}/>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(login(data)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);

