import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <div>
      <p>question layout</p>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default QuestionLayout
