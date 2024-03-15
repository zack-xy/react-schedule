import type { FC } from 'react'
import React from 'react'
import { Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <div>
      <p>question layout</p>
      <div>
        {waitingUserData
          ? (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <Spin />
            </div>
            )
          : <Outlet />}
      </div>
    </div>
  )
}

export default QuestionLayout
