import { useEffect } from 'react'

import { Modal } from '@/components/modal'
import { Comments } from '@/components/comments'

import type { Post } from '@/types/post'

import { formatDate } from '@/utils/date'

import { PostImage } from '@/components/post-image'
import { type RootState, useAppDispatch } from '@/store'
import { fetchComments } from '@/store/slices/commentsSlice.ts'
import { useSelector } from 'react-redux'

import styles from './modal-post-view.module.scss'

type Props = {
  post: Post
  onClose: () => void
}

export const ModalPostView = ({ post, onClose }: Props) => {
  const dispatch = useAppDispatch()

  const comments = useSelector((state: RootState) => state.comment.comments)

  useEffect(() => {
    dispatch(fetchComments(post.id))
  }, [dispatch, post.id])

  return (
    <Modal isOpen={true} onClose={onClose} width={1200}>
      <div className={styles.imageWrapper}>
        <PostImage className={styles.image} src={post.imageUrl} alt={post.title} />
      </div>
      <article className={styles.article}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span>Author: {post.author}</span>
          <span>Date: {formatDate(post.updatedAt)}</span>
        </div>
        <p className={styles.text}>{post.text}</p>
        <Comments postId={post.id} comments={comments} />
      </article>
    </Modal>
  )
}
