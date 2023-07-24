import { ComponentPropsType } from '@/components/QuestionComponents'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import {
  getComponent,
  getNextSelected,
  getSelectedCompIndex,
  getSelectedComponent,
  insertNewComponent,
} from '@/store/componentsReducer/utils.ts'
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden: boolean
  isLocked: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  selectedId: string
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resetComponents: (state, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        insertNewComponent(draft, action.payload)
      }
    ),
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      draft.selectedId = getNextSelected(selectedId, componentList)
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      componentList.splice(index, 1)
    }),
    //  显示隐藏组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload
        let newSelectedId = ''
        if (isHidden) {
          //   隐藏
          newSelectedId = getNextSelected(
            fe_id,
            componentList.filter(c => !c.isHidden)
          )
        } else {
          //   显示
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),

    //   锁定/解锁组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft
        const { fe_id } = action.payload
        const curComp = getComponent(fe_id, componentList)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    // 拷贝当前选中组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const selectedComponent = getSelectedComponent(draft)
      if (!selectedComponent) return
      draft.copiedComponent = cloneDeep(selectedComponent)
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (!copiedComponent) return
      copiedComponent.fe_id = nanoid(5)
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { componentList } = draft
      const selectedIndex = getSelectedCompIndex(draft)
      if (selectedIndex <= 0) return // 未选中或选中了第一个 无法向上
      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),
    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { componentList } = draft
      const selectedIndex = getSelectedCompIndex(draft)
      if (selectedIndex < 0 || selectedIndex === componentList.length - 1) return // 未选中或选中最后一个
      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),

    // 修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { fe_id, title } = action.payload
        const selectedComp = getComponent(fe_id, draft.componentList)
        if (selectedComp) {
          selectedComp.title = title
        }
      }
    ),
    // 拖拽重新排序组件列表
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { oldIndex, newIndex } = action.payload
        draft.componentList = arrayMove(draft.componentList, oldIndex, newIndex)
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
