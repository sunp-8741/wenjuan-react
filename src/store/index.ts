import { configureStore } from '@reduxjs/toolkit'
import { userSlice, UseStateType } from '@/store/userReducer.ts'
import { componentsSlice, ComponentsStateType } from '@/store/componentsReducer'
import { pageInfoSlice, PageInfoType } from '@/store/PageInfoReducer.ts'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
export type StateType = {
  user: UseStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    components: undoable(componentsSlice.reducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoSlice.reducer,
  },
})
