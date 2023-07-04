import { FC, useContext } from 'react'

import { TodoContext } from './index.tsx'

export const TodoList: FC = () => {
  const { state, dispatch } = useContext(TodoContext)

  function del(id: string) {
    dispatch({
      type: 'delete',
      payload: id,
    })
  }

  return (
    <ul>
      {state.map(todo => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => del(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  )
}
