import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export interface ComponentsStateType {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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

      insertNewComponent(draft, newComponent)
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

    // 锁定 / 解锁 组件
    toggleComponentLocked: produce((draft: ComponentsStateType, action: PayloadAction<Pick<ComponentInfoType, 'fe_id'>>) => {
      const { componentList = [] } = draft
      const { fe_id } = action.payload

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp)
        curComp.isLocked = !curComp.isLocked
    }),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft
      const selectedComponent = componentList.find(i => i.fe_id === selectedId)
      if (selectedComponent)
        draft.copiedComponent = cloneDeep(selectedComponent)
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent) {
        // 修改fe_id
        copiedComponent.fe_id = nanoid()
        // 插入组件
        insertNewComponent(draft, copiedComponent)
      }
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
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
