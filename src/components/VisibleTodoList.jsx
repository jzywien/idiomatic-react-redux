import React, {Component} from 'react';
import {connect} from 'react-redux';
import Todo from './Todo.jsx';
import FetchError from './FetchError.js';
import * as actions from '../actions/todos.js';
import {withRouter} from 'react-router';
import { getVisibleTodos, getIsFetching, getErrorMessage} from '../reducers/todos.js';

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter);
  }

  render() {
    const {toggleTodo, errorMessage, todos, isFetching} = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}>
        </FetchError>
      )
    }
    return (
      <TodoList
        isFetching={isFetching}
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

// params comes from ownProps.params passed in by withRouter
// withRouter passes route params via props to mapStateToProps
const mapStateToProps = (state, {params}) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter: filter,
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   }
// });

// passing actions functions in here to connect will wrap all action calls with dispatch call
// Example, actions.requestTodos becomes dispatch(requestTodos) in the react component
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;