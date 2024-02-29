import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <div>header</div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>footer</div>
    </>
  )
}

export default MainLayout
