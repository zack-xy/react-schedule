import type { FC } from 'react'
import React from 'react'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import type { ComponentInfoType } from '../../../store/componentsReducer'
import styles from './EditCanvas.module.scss'

interface PropsType {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf === undefined)
    return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c

        return (
          <div
            key={fe_id}
            className={styles['component-wrapper']}
          >
            <div className={styles.component}>
              {getComponent(c)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
