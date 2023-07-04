import { configureStore } from '@reduxjs/toolkit'
import { countSlice } from './count.ts'
import { TodoItemType, todoListSlice } from './todoList.ts'
export type StateType = {
  count: number
  todoList: TodoItemType[]
}
export default configureStore({
  reducer: {
    count: countSlice.reducer,
    todoList: todoListSlice.reducer,
  },
})
