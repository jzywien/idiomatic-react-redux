
// const loggerMw = (store) => (next) => {
//   if (!console.group) return next;

//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev state', 'color: gray', store.getState());
//     console.log('%c action', 'color: blue', action);
//     const returnVal = next(action);
//     console.log('%c next state', 'color: green', store.getState());
//     console.groupEnd(action.type);
//     return returnVal;
//   };
// };

// const promiseMw = (store) => (next) => (action) => {
//   if (typeof action.then === 'function') {
//     return action.then(next);
//   }
//   return next(action);
// };

const thunkMw = (store) => (next) => (action) => (
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)
);

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener(state, action));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return {getState, dispatch, subscribe};
}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((memo, key) => {
      memo[key] = reducers[key](
        state[key],
        action
      );
      return memo;
    }, {});
  };
};

const wrapDispatchWithMiddleware = (store, middleware) => {
  middleware.slice().reverse().forEach(mw =>
    store.dispatch = mw(store)(store.dispatch)
  );
};

export {
  createStore,
  combineReducers,
  wrapDispatchWithMiddleware
};