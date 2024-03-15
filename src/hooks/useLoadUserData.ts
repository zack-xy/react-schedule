import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'
import useGetUserInfo from './useGetUserInfo'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username)
      setWaitingUserData(false)
    else run()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
