import { createContext, FC, useState } from 'react'
import Toolbar from './Toolbar.tsx'
import { CountReducer } from '../CountReducer.tsx'

const themes = {
  light: {
    fore: '#000',
    background: '#eee',
  },
  dark: {
    fore: '#fff',
    background: '#222',
  },
}

export const ThemeContext = createContext(themes.light)

export const ContentDemo: FC = () => {
  const [theme, setTheme] = useState(themes.light)
  function toDark() {
    setTheme(themes.dark)
  }
  return (
    <ThemeContext.Provider value={theme}>
      <CountReducer />
      <div>
        <p>Context Demo</p>
        <div>
          <button onClick={toDark}>dark</button>
        </div>
      </div>
      <Toolbar />
    </ThemeContext.Provider>
  )
}
