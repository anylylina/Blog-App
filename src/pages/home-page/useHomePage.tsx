import { useState } from 'react'
import type { Post } from '@/types/post.ts'

export const useHomePage = () => {
  const [isShowCreatePostForm, setIsShowCreatePostForm] = useState(false)
  const [showPostView, setShowPostView] = useState<Post | null>(null)
  const [showEditPost, setEditPost] = useState<Post | null>(null)

  const handleOpenCreateForm = () => {
    setIsShowCreatePostForm(true)
  }

  const handleCloseCreateForm = () => {
    setIsShowCreatePostForm(false)
  }

  const handleOpenEditPost = (post: Post) => {
    setEditPost(post)
  }

  const handleCloseEditPost = () => {
    setEditPost(null)
  }

  const handleOpenViewPost = (post: Post) => {
    setShowPostView(post)
  }

  const handleClosePostView = () => {
    setShowPostView(null)
  }

  return {
    isShowCreatePostForm,
    showPostView,
    showEditPost,
    handleOpenCreateForm,
    handleCloseCreateForm,
    handleOpenEditPost,
    handleCloseEditPost,
    handleOpenViewPost,
    handleClosePostView,
  }
}
