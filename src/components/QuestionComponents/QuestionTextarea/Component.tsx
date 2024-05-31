import type { FC } from 'react'
import React from 'react'
import { Input, Typography } from 'antd'
import type { QuestionTextareaPropsType } from './interface'
import { QuestionTextareaDefaultProps } from './interface'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </>
  )
}

export default QuestionTextarea
