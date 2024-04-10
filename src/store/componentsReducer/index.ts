import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId } from './utils'

export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  props: ComponentPropsType
}

export interface ComponentsStateType {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },

    // 修改selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),

    // 添加新组件
    addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload

      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      if (index < 0)
        draft.componentList.push(newComponent)
      else
        draft.componentList.splice(index + 1, 0, newComponent)

      draft.selectedId = newComponent.fe_id
    }),

    // 修改组件属性
    changeComponentProps: produce((draft: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>) => {
      const { fe_id, newProps } = action.payload

      const curComp = draft.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        }
      }
    }),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft

      const newSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = newSelectedId

      const idx = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(idx, 1)
    }),

    // 隐藏 / 显示 组件
    changeComponentHidden: produce((draft: ComponentsStateType, action: PayloadAction<Pick<ComponentInfoType, 'fe_id' | 'isHidden'>>) => {
      const { componentList = [] } = draft
      const { fe_id, isHidden } = action.payload

      let newSelectedId = ''
      if (isHidden)
        newSelectedId = getNextSelectedId(fe_id, componentList)
      else
        newSelectedId = fe_id
      draft.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp)
        curComp.isHidden = isHidden
    }),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
} = componentsSlice.actions

export default componentsSlice.reducer
