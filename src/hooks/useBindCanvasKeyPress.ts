import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { copySelectedComponent, pasteCopiedComponent, removeSelectedComponent, selectNextComponent, selectPrevComponent } from '../store/componentsReducer'

// 当前光标命中的元素是否是合法的（光标是否在编辑画布上）
function isActiveElementValid() {
  const activeElem = document.activeElement

  if (activeElem === document.body)
    return true // 光标没有在input中
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid())
      dispatch(removeSelectedComponent())
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid())
      dispatch(copySelectedComponent())
  })
  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid())
      dispatch(pasteCopiedComponent())
  })

  // 选中向上移动
  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid())
      dispatch(selectPrevComponent())
  })

  // 选中向下移动
  useKeyPress(['downarrow'], () => {
    if (isActiveElementValid())
      dispatch(selectNextComponent())
  })

  // TODO 撤销重做
}

export default useBindCanvasKeyPress
