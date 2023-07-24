import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'
const { Search } = Input
export const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])
  const [value, setValue] = useState('')
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  function onSearch(value: string) {
    console.log(value)
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <Search
      placeholder="请输入关键字"
      onSearch={onSearch}
      value={value}
      onChange={onChange}
      allowClear
    />
  )
}
