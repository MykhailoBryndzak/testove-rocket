import React, {Component} from 'react';
import Board from "./Components/Board/KanbanBoard";
import {connect} from "react-redux";
import Auth from "./Components/Auth/Auth";
import {logout} from "./actions/auth";
import styled from 'styled-components';

const LogoutButton = styled.button`
  height: 30px;
  margin: 15px;
  font-size: 1em;
  background: #5101d1
  color: white;
  cursor: pointer;
`;

class App extends Component {
  render() {
    const {isLogin, firstName, lastName} = this.props;

    return (
      <div>
        <header style={{display: 'flex', justifyContent: 'space-between'}}>
          <h1>Kanban Board </h1>
          {isLogin &&
            <div>
              <span style={{fontSize: '1.2em'}}>
                {`${firstName} ${lastName}`}
              </span>
              <LogoutButton
                onClick={this.props.logout}>
                Log out
              </LogoutButton>
            </div>
          }
        </header>
        {isLogin ? <Board /> : <Auth />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.userData.isLogin,
    firstName: state.auth.userData.firstName,
    lastName: state.auth.userData.lastName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



