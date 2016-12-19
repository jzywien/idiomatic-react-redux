import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers/todos.js';
//import promise from 'redux-promise';
import createLogger from 'redux-logger';
//import {loadState, saveState} from './localStorage.js';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';


const configureStore = () => {
  // Load state from local storage
  // const persistedState = loadState();
  const persistedState = {};


  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  return createStore(
    todoApp,
    persistedState,
    applyMiddleware(...middleware)
  );

  // Save state to local storage
  // store.subscribe(throttle(() => {
  //   const state = store.getState();
  //   saveState({
  //     todos: state.todos
  //   });
  // }));

}

export default configureStore;