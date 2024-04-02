import type { FC } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import type { ComponentPropsType } from '../../../components/QuestionComponents'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null)
    return <NoProp />

  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null)
    return <NoProp />
  const { PropComponent } = componentConf

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null)
      return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
