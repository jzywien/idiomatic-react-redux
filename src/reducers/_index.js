import {combineReducers} from 'redux';
import todosReducer, * as fromTodosReducer from './todosReducer.js';

const todoApp = combineReducers({
  todos: todosReducer
});

export default todoApp;

export const getVisibleTodos = (state, filter) => (
  fromTodosReducer.getVisibleTodos(state.todos, filter)
);