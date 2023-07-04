import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from '../store'
import { addTodo, removeTodo, TodoItemType, toggleComplete } from '../store/todoList.ts'
import { nanoid } from 'nanoid'

export const TodoList: FC = () => {
  const todoList = useSelector<StateType>(state => state.todoList) as TodoItemType[]
  const dispatch = useDispatch()
  function del(id: string) {
    dispatch(removeTodo({ id }))
  }
  function toggle(id: string) {
    dispatch(toggleComplete({ id }))
  }
  function add() {
    const id = nanoid(5)
    const newTodo: TodoItemType = {
      id,
      title: `todo-${id}`,
      completed: false,
    }
    dispatch(addTodo(newTodo))
  }
  return (
    <>
      <p>todo list</p>
      <div>
        <button onClick={() => add()}>添加 TODO</button>
      </div>
      <ul>
        {todoList.map(todo => {
          const { id, completed, title } = todo
          return (
            <li key={id} className={completed ? 'line-through' : ''}>
              <span>{title}</span>
              <button onClick={() => del(id)}>删除</button>
              <button onClick={() => toggle(id)}>切换</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
