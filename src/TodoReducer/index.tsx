import { createContext, FC, useReducer } from 'react'
import { TodoList } from './TodoList.tsx'
import { InputForm } from './InputForm.tsx'
import reducer, { ActionType } from './reducer.ts'
import { initialState } from './store.ts'

export const TodoContext = createContext({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (action: ActionType) => {
    /*返回空*/
  },
})
export const TodoReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <p>toto reducer</p>
      <TodoList />
      <InputForm />
    </TodoContext.Provider>
  )
}
