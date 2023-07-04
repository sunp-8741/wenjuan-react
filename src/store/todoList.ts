import { nanoid } from 'nanoid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TodoItemType = {
  id: string
  title: string
  completed: boolean
}

const INIT_STATE: TodoItemType[] = [
  {
    id: nanoid(),
    title: '吃饭',
    completed: false,
  },
  {
    id: nanoid(),
    title: '睡觉',
    completed: true,
  },
]

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: INIT_STATE,
  reducers: {
    addTodo(state: TodoItemType[], action: PayloadAction<TodoItemType>) {
      return [...state, action.payload]
    },
    removeTodo(state, action: PayloadAction<{ id: string }>) {
      return state.filter(todo => todo.id !== action.payload.id)
    },
    toggleComplete(state: TodoItemType[], action: PayloadAction<{ id: string }>) {
      const { id: toggleId } = action.payload
      return state.map(todo => {
        const { id, completed } = todo
        if (id !== toggleId) return todo
        return {
          ...todo,
          completed: !completed,
        }
      })
    },
  },
})

export const { addTodo, removeTodo, toggleComplete } = todoListSlice.actions
