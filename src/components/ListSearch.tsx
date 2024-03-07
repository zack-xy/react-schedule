import { Input } from 'antd'
import { useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: '300px' }}
      value={value}
    >
    </Search>
  )
}

export default ListSearch
