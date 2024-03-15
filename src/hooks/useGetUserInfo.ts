import { useSelector } from 'react-redux'
import type { StoreType } from '../store'
import type { UserStateType } from '../store/userReducer'

function useGetUserInfo() {
  const { username, nickname } = useSelector<StoreType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default useGetUserInfo
