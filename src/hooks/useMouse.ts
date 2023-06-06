import { useEffect, useState } from 'react'

export default function () {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      setX(event.clientX)
      setY(event.clientY)
    }
    window.addEventListener('mousemove', mouseMoveHandler)
    //   组件销毁时，解绑DOM事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])
  return { x, y }
}
