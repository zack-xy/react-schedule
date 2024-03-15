import type { FC } from 'react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingUserData
          ? (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <Spin />
            </div>
            )
          : <Outlet />}
      </Content>
      <Footer className={styles.footer}>
        React问卷 &copy; 2023 - present. Created by Zack Zheng
      </Footer>
    </Layout>
  )
}

export default MainLayout
