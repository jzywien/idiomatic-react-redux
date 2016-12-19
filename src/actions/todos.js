
import {normalize} from 'normalizr';
import * as schema from './schema.js';
import * as api from '../api';
import {getIsFetching} from '../reducers/todos.js';

const ADD_TODO_ACTION = 'ADD_TODO';
const TOGGLE_TODO_ACTION = 'TOGGLE_TODO';

// export const addTodo = text => ({
//   type: ADD_TODO_ACTION,
//   id: v4(),
//   text
// });

export const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then(response => {
    console.log('normalized response', normalize(response, schema.todo));
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    });
  });
};

export const addTodoChanged = (isEmpty, text) => (dispatch) => {
  if (!text && !isEmpty) {
    dispatch({
      type: 'ADD_TODO_EMPTY'
    });
  } else if (text && isEmpty) {
    dispatch({
      type: 'ADD_TODO_NOT_EMPTY'
    });
  }
};

export const toggleTodo = (id) => (dispatch) => {
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    });
  });
};


export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) return Promise.resolve();

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      console.log('normalized response', normalize(response, schema.arrayOfTodos));
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfTodos)
      })
    }, error => {
      dispatch({
        type: 'FETCH_TODOS_ERROR',
        filter,
        message: error.message || 'Something went wrong'
      });
    }
  );
}

