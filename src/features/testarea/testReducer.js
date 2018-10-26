import { createReducer } from '../../app/common/util/reducerUtil'
import { INCREMENT_CONUNTER, DECREMENT_CONUNTER } from './testConstants';

const initialState = {
  data: 42
}

export const incrementCounter = (state, payload) => {
  return {...state, data: state.data + 1}
}

export const decrementCounter = (state, payload) => {
  return {...state, data: state.data - 1}
}

// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_CONUNTER:
//       return {...state, data: state.data + 1}
//     case DECREMENT_CONUNTER:
//       return {...state, data: state.data - 1}
//     default:
//       return state
//   }
// }

export default createReducer(initialState, {
  [INCREMENT_CONUNTER]: incrementCounter,
  [DECREMENT_CONUNTER]: decrementCounter
})