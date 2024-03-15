import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from '../router'
import useGetUserInfo from './useGetUserInfo'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData)
      return

    if (username) {
      if (isLoginOrRegister(pathname))
        nav(MANAGE_INDEX_PATHNAME)
      return
    }

    if (!isNoNeedUserInfo(pathname))
      nav(LOGIN_PATHNAME)
  }, [waitingUserData, username, pathname])
}

export default useNavPage
