import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.jsx';
import configureStore from './configureStore.js';

const store = configureStore();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('todo-root')
)


