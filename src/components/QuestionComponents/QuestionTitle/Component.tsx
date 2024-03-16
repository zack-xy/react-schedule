import type { FC } from 'react'
import React from 'react'
import { Typography } from 'antd'
import type { QuestionTitlePropsType } from './interface'
import { QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const getFontSize = (level: number) => {
    if (level === 1)
      return '24px'
    if (level === 2)
      return '20px'
    if (level === 3)
      return '16px'
    if (level === 4)
      return '14px'
    if (level === 5)
      return '12px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
