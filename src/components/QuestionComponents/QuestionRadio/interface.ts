export interface OptionType {
  value: string
  text: string
}

export interface QuestionRadioPropsType {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  // 用于PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项一' },
    { value: 'item2', text: '选项二' },
    { value: 'item3', text: '选项三' },
  ],
  value: '',
}
