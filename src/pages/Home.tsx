import type { FC } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    nav('/login')
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <Button type="primary" onClick={clickHandler}>登陆</Button>
      </div>
    </div>
  )
}

export default Home
