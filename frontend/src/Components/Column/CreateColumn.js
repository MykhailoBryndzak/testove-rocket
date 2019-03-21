import React, {Component} from 'react';
import {connect} from "react-redux";
import {newColumn} from "../../actions/coulums";
import styled from 'styled-components';

const InputCreateColumn = styled.input`
  padding: 5px;
  margin: 10px;
  fontSize: 1em;
`;

const ButtonCreateColumn = styled.button`
  width: 100px;
  height: 30px;
  padding: 5px;
  margin: 5px;
  background-color: cadetblue;
  color: white;
  border: solid thin cadetblue;
  border-radius: 5px;
  font-size: 0.8em;
  cursor: pointer;
`;

class CreateColumn extends Component {
  state = {
    columnTitle: '',
  };

  newColumn = () => {
    if (this.state.columnTitle !== '') {
      this.props.newColumn(this.state.columnTitle);
      this.setState({columnTitle: ''})
    }
  };

  render() {
    const handleChangeColumnTitle = (event) => {
      this.setState({columnTitle: event.target.value})
    };
    return (
      <div style={{marginLeft: 100}}>
        <InputCreateColumn
          type="text"
          value={this.state.columnTitle}
          onChange={handleChangeColumnTitle}
        />
        <ButtonCreateColumn
          onClick={this.newColumn}
        >
          New Column
        </ButtonCreateColumn>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newColumn: (data) => dispatch(newColumn(data)),
  };
}

export default connect(null, mapDispatchToProps)(CreateColumn);
