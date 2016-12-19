import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import TodoApp from './TodoApp.jsx';
import Login from './Login.jsx';

const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/(:filter)' component={TodoApp} />
      <Route path='/login' component={Login} />
    </Router>
  </Provider>
);

Root.propType = {
  store: PropTypes.object.isRequired
};

export default Root;