import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import { fetchPosts } from '@/store/slices/postSlice.ts'

export const usePosts = () => {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector((state) => state.posts.loading)
  const posts = useAppSelector((state) => state.posts.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return {
    isLoading,
    posts,
  }
}
