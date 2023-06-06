import { useEffect, useState } from 'react'

function getInfo() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Date.now().toString())
    }, 1000)
  })
}
export default function () {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState('')
  useEffect(() => {
    getInfo().then(info => {
      setLoading(false)
      setInfo(info)
    })
  })
  return { loading, info }
}
