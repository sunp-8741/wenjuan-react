import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from './store'
import { decrease, increase } from './store/count.ts'

export const Count: FC = () => {
  const count = useSelector<StateType>(state => state.count)
  const dispatch = useDispatch()
  return (
    <div>
      <span>
        <>count: {count}</>
      </span>
      <button onClick={() => dispatch(increase())}>+</button>
      <button onClick={() => dispatch(decrease())}>-</button>
    </div>
  )
}
