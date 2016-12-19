const todo = (state, {type, ...payload}) => {
  switch(type) {
    case 'ADD_TODO':
      return {
        id: payload.id,
        text: payload.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== payload.id) return state;
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

export default todo;