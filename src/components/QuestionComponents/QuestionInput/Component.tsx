import type { FC } from 'react'
import React from 'react'
import { Input, Typography } from 'antd'
import type { QuestionInputPropsType } from './interface'
import { QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  )
}

export default QuestionInput
