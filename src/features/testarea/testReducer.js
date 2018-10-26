import { INCREMENT_CONUNTER, DECREMENT_CONUNTER } from "./testConstants";

const initialState = {
  data: 42
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_CONUNTER:
      return {...state, data: state.data + 1}
    case DECREMENT_CONUNTER:
      return {...state, data: state.data - 1}
    default:
      return state
  }
}

export default testReducer