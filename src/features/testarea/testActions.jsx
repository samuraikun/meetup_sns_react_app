import { INCREMENT_CONUNTER, DECREMENT_CONUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISHED } from './testConstants'

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

export const startCounterAction = () => {
  return {
    type: COUNTER_ACTION_STARTED
  }
}

export const finishCounterAction = () => {
  return {
    type: COUNTER_ACTION_FINISHED
  }
}

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction())
    await delay(1000)
    dispatch({type: INCREMENT_CONUNTER})
    dispatch(finishCounterAction())
  }
}

export const decrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction())
    await delay(1000)
    dispatch({type: DECREMENT_CONUNTER})
    dispatch(finishCounterAction())
  }
}