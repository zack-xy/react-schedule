import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import type { ComponentPropsType } from '../../components/QuestionComponents'

export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
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
  },
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsSlice.reducer
