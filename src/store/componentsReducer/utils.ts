import type { ComponentInfoType } from './index'

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0)
    return ''

  let newSelectedId = ''
  const length = componentList.length
  if (length <= 1) {
    newSelectedId = ''
  }
  else {
    if (index + 1 === length)
      newSelectedId = componentList[index - 1].fe_id
    else
      newSelectedId = componentList[index + 1].fe_id
  }
  return newSelectedId
}
