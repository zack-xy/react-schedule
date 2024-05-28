import type { FC, MouseEvent } from 'react'
import React from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { type ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'
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
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.filter(c => !c.isHidden).map((c) => {
        const { fe_id, isLocked } = c

        // 拼接class name
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassName = styles.selected
        const lockedClassName = styles.locked
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
          [lockedClassName]: isLocked,
        })

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={e => handleClick(e, fe_id)}
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
