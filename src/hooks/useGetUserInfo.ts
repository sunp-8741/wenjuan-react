import { useSelector } from 'react-redux'
import { StateType } from '@/store'
import { UseStateType } from '@/store/userReducer.ts'

export default function () {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UseStateType
  return { username, nickname }
}
