import { useSelector } from 'react-redux'
import type { StoreType } from '../store'
import type { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StoreType>(state => state.components) as ComponentsStateType
  const { componentList = [] } = components
  return {
    componentList,
  }
}

export default useGetComponentInfo
