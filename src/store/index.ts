import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/postSlice'
import commentsReducer from './slices/commentsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comment: commentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
