import { FC, useReducer } from 'react'

type StateType = { count: number }
type ActionType = { type: string }
const initialState: StateType = { count: 100 }
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}
export const CountReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <span>count {state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}
