import type { FC } from 'react'
import type { QuestionInputPropsType } from './QuestionInput'
import type { QuestionTitlePropsType } from './QuestionTitle'
import QuestionInputConf from './QuestionInput'
import QuestionTitleConf from './QuestionTitle'

// 组件的prop类型
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

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
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
