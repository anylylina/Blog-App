import React from 'react'
import { Header } from '@/components/header'
import { Posts } from '@/components/posts/posts'

import { Button } from '@/ui/button'
import { useHomePage } from './useHomePage'

const ModalCreatePost = React.lazy(() =>
  import('@/components/modal-create-post').then((r) => ({
    default: r.ModalCreatePost,
  }))
)
const PostViewModal = React.lazy(() =>
  import('@/components/modal-post-view').then((r) => ({
    default: r.ModalPostView,
  }))
)
const ModalEditPost = React.lazy(() =>
  import('@/components/modal-edit-post').then((r) => ({
    default: r.ModalEditPost,
  }))
)

export const HomePage = () => {
  const {
    isShowCreatePostForm,
    showEditPost,
    showPostView,
    handleOpenEditPost,
    handleCloseEditPost,
    handleOpenViewPost,
    handleClosePostView,
    handleOpenCreateForm,
    handleCloseCreateForm,
  } = useHomePage()

  return (
    <>
      <Header>
        <Button onClick={handleOpenCreateForm}>Create a post</Button>
      </Header>
      <Posts onEdit={handleOpenEditPost} onView={handleOpenViewPost} />
      {isShowCreatePostForm && <ModalCreatePost onClose={handleCloseCreateForm} />}
      {showPostView && <PostViewModal onClose={handleClosePostView} post={showPostView} />}
      {showEditPost && <ModalEditPost post={showEditPost} onClose={handleCloseEditPost} />}
    </>
  )
}
