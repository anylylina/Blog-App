import { useState } from 'react'
import { CommentItem } from '@/components/comment-item'
import { CommentForm } from '@/components/comment-form'
import type { Comment } from '@/types/comment'

import { useAppDispatch } from '@/store'
import { addComment } from '@/store/slices/commentsSlice'

import styles from './comments.module.scss'

type Props = {
  postId: string
  comments: Comment[]
}

export const Comments = ({ postId, comments }: Props) => {
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const handleAddComment = async (author: string, text: string) => {
    setIsLoading(true)
    await dispatch(addComment({ postId, commentData: { author, text } }))
    setIsLoading(false)
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Comments ({comments.length})</h3>
      {comments.length > 0 ? (
        <div className={styles.list}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
      )}
      <CommentForm postId={postId} onCreate={handleAddComment} loading={isLoading} />
    </div>
  )
}
