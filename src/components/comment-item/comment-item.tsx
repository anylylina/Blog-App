import type { Comment } from '@/types/comment'
import { formatDate } from '@/utils/date'
import { deleteComment } from '@/store/slices/commentsSlice'
import { useAppDispatch } from '@/store'
import { Button } from '@/ui/button'

import styles from './comment-item.module.scss'

type Props = {
  comment: Comment
}

export const CommentItem = ({ comment }: Props) => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment({ commentId: comment.id, postId: comment.postId }))
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.author}>{comment.author}</span>
          <span className={styles.date}>{formatDate(comment.createdAt)}</span>
        </div>
        <Button variant="secondary" onClick={handleDelete} className={styles.deleteButton}>
          Удалить
        </Button>
      </div>
      <p className={styles.text}>{comment.text}</p>
    </div>
  )
}
