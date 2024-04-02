import { useSelector } from 'react-redux'
import type { StoreType } from '../store'
import type { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StoreType>(state => state.components) as ComponentsStateType
  const { componentList = [], selectedId } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
  }
}

export default useGetComponentInfo
