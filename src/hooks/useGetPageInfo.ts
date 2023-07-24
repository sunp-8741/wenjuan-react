import { useSelector } from 'react-redux'
import { StateType } from '@/store'
import { PageInfoType } from '@/store/PageInfoReducer.ts'

export default function () {
  return useSelector<StateType>(state => state.pageInfo) as PageInfoType
}
