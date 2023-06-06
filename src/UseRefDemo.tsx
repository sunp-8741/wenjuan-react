import { FC, useMemo, useRef, useState } from 'react'
import useMouse from './hooks/useMouse.ts'
import useGetInfo from './hooks/useGetInfo.ts'
import { useTitle } from 'ahooks'

export const UseRefDemo: FC = () => {
  useTitle('测试1')
  const { loading, info } = useGetInfo()
  const inputRef = useRef<HTMLInputElement>(null)
  function selectInput() {
    const inputElement = inputRef.current
    inputElement?.select()
  }
  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [text, setText] = useState('hello')
  const sum = useMemo(() => {
    return num1 + num2
  }, [num1, num2])
  return (
    <div className="">
      <p>{loading ? 'loading....' : info}</p>
    </div>
  )
}
