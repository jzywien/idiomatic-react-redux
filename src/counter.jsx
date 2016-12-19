import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import {createStore} from './jz-redux.js';

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(counter);

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1> {value} </h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = (state) => {
  ReactDOM.render(
    <Counter
      value={state}
      onIncrement={() => {
        store.dispatch({
          type: 'INCREMENT'
        })
      }}
      onDecrement={() => {
        store.dispatch({
          type: 'DECREMENT'
        })
      }}
    />,
    document.getElementById('counter')
  )
};
store.subscribe(render);

expect(counter(1, {type: 'INCREMENT'})).toEqual(2);
expect(counter(1, {type: 'DECREMENT'})).toEqual(0);

render(store.getState());