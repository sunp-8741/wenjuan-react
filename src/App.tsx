// import { useState } from 'react'
import './App.css'

import { useState } from 'react'
import { ImmerDemo } from './immerDemo.tsx'
import { Button } from 'antd'
import { List2 } from './List2.tsx'
import { UseRefDemo } from './UseRefDemo.tsx'

function App() {
  const [count, setCount] = useState(0)
  const add = () => {
    setCount(count + 1)
    console.log(count)
  }
  return (
    <>
      {/*<div className="card">*/}
      {/*  <Button>11</Button>*/}
      {/*  <button onClick={add}>count is {count}</button>*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to test HMR*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<p className="read-the-docs">Click on the Vite and React logos to learn more</p>*/}
      {/*<ImmerDemo />*/}
      {/*<List2 />*/}
      <UseRefDemo />
    </>
  )
}

export default App
