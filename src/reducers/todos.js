import {combineReducers} from 'redux';
import byId, * as fromById from './byId.js';
import createList, * as fromCreateList from './createList.js';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
});

const addTodoDisabled = (state = true, action) => {
  switch (action.type) {
    case 'ADD_TODO_EMPTY':
      return true;
    case 'ADD_TODO_NOT_EMPTY':
      return false;
    default:
      return state;
  }
}

const todos = combineReducers({
  byId,
  listByFilter,
  addTodoDisabled
});

export default todos;

// const getAllTodos = (state) => (
//   state.allIds.map(id => state.byId[id])
// );
export const getErrorMessage = (state, filter) => {
  return fromCreateList.getErrorMessage(state.listByFilter[filter]);
};

export const getIsFetching = (state, filter) => {
  return fromCreateList.getIsFetching(state.listByFilter[filter]);
};

export const getVisibleTodos = (state, filter) => {
  const ids = fromCreateList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
  // const allTodos = getAllTodos(state);
  // switch(filter) {
  //   case 'all':
  //     return allTodos;
  //   case 'completed':
  //     return allTodos.filter(t => t.completed);
  //   case 'active':
  //     return allTodos.filter(t => !t.completed);
  //   default:
  //     return allTodos;
  // }
}