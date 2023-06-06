import { FC, useState } from 'react'
import { produce } from 'immer'

export const ImmerDemo: FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '测试',
    age: 20,
  })
  const [list, setList] = useState(['x', 'y'])
  function addItem() {
    setList(
      produce(draft => {
        draft.push('z')
      })
    )
  }
  function changeAge() {
    setUserInfo(
      produce(user => {
        user.age = 21
      })
    )
  }
  return (
    <div>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={changeAge}></button>

      <div>{JSON.stringify(list)}</div>
      <button onClick={addItem}></button>
    </div>
  )
}
