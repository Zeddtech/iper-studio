function Reducer(state, { type }) {
  switch (action.type) {
    case firstname:
      return { ...state, type: action.value };
      break;

    default:
      break;
  }
}
