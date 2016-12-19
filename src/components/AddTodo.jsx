import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/todos.js';

class AddTodo extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddTooDisabled: true
    };
    this.handleTodoChanged = this.handleTodoChanged.bind(this);
    this.clearTodo = this.clearTodo.bind(this);
  }

  handleTodoChanged(evt) {
    this.setState({
      isAddTooDisabled: !evt.target.value
    });
  }

  clearTodo(input) {
    input.value = '';
    this.setState({
      isAddTooDisabled: true
    });
  }

  render() {
    let input;
    const {addTodoDisabled, addTodoChanged, addTodo} = this.props;
    const {isAddTooDisabled} = this.state;
    return (
      <div>
        <input ref={node => {
          input = node
        }}
        onChange={this.handleTodoChanged}
        />
        <button
          onClick={() => {
            addTodo(input.value);
            this.clearTodo(input);
          }}
          disabled={isAddTooDisabled}
        >
          Add Todo
        </button>
      </div>
    );
  }

};

// let AddTodo = ({dispatch, addTodo, addTodoChanged, addTodoDisabled}) => {
//   let input;

//   return (
//     <div>
//       <input ref={node => {
//         input = node
//       }}
//       onChange={() => {
//           addTodoChanged(addTodoDisabled, input.value)
//         }}
//       />
//       <button
//         onClick={() => {
//           addTodo(input.value);
//           input.value = '';
//         }}
//         disabled={addTodoDisabled}
//       >
//         Add Todo
//       </button>
//     </div>
//   )
// };


const mapStateToProps = (state, ownProps) => {
  return {
    addTodoDisabled: state.addTodoDisabled
  }
};


// passing actions functions in here to connect will wrap all action calls with dispatch call
AddTodo = connect(
  mapStateToProps,
  actions
)(AddTodo); // still passes dispatch to the component

export default AddTodo;