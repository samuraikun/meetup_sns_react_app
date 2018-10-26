import { INCREMENT_CONUNTER, DECREMENT_CONUNTER } from './testConstants'

export const incrementCounter = () => {
  return {
    type: INCREMENT_CONUNTER
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT_CONUNTER
  }
}