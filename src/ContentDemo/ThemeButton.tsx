import { FC, useContext } from 'react'
import { ThemeContext } from './index.tsx'

const ThemeButton: FC = () => {
  const theme = useContext(ThemeContext)
  const style = {
    color: theme.fore,
    background: theme.background,
  }
  return (
    <>
      <button style={style}>theme button</button>
    </>
  )
}

export default ThemeButton
