import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/componentsReducer'
import { ActionCreators } from 'redux-undo'
function isActiveElementValid() {
  const activeElem = document.activeElement
  return activeElem === document.body || activeElem?.matches('div[role="button"]')
}
export default function () {
  const dispatch = useDispatch()
  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  // 选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )
  // 重做
  useKeyPress(
    ['ctrl。shift.z', 'meta.shift.z'],
    () => {
      dispatch(ActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}
