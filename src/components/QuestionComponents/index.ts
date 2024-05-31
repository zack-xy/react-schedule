import type { FC } from 'react'
import type { QuestionInputPropsType } from './QuestionInput'
import type { QuestionTitlePropsType } from './QuestionTitle'
import type { QuestionParagraphPropsType } from './QuestionParagraph'
import type { QuestionInfoPropsType } from './QuestionInfo'
import type { QuestionTextareaPropsType } from './QuestionTextarea'
import type { QuestionRadioPropsType } from './QuestionRadio'
import type { QuestionCheckboxPropsType } from './QuestionCheckbox'

import QuestionInputConf from './QuestionInput'
import QuestionTitleConf from './QuestionTitle'
import QuestionParagraphConf from './QuestionParagraph'
import QuestionInfoConf from './QuestionInfo'
import QuestionTextareaConf from './QuestionTextarea'
import QuestionRadioConf from './QuestionRadio'
import QuestionCheckboxConf from './QuestionCheckbox'

// 组件的prop类型
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType & QuestionParagraphPropsType & QuestionInfoPropsType & QuestionTextareaPropsType & QuestionRadioPropsType & QuestionCheckboxPropsType

// 组件的配置
export interface ComponentConfType {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
