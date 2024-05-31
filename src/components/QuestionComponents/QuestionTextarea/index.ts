// 多行输入组件
import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Textarea组件的配置
export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultProps,
}
