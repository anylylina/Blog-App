import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  increment,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Comment, CommentFormData } from '@/types/comment'
import { dateToTimestamp, timestampToDate } from '@/services/utils.ts'

const docToComment = (doc: QueryDocumentSnapshot): Comment => {
  const data = doc.data()

  return {
    id: doc.id,
    postId: data.postId,
    author: data.author,
    text: data.text,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
  }
}

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  try {
    const snapshot = await getDocs(query(collection(db, 'comments'), where('postId', '==', postId)))

    return snapshot.docs.map(docToComment)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const addComment = async (
  postId: string,
  commentData: CommentFormData
): Promise<Comment> => {
  try {
    const date = new Date()

    const newComment = {
      postId,
      author: commentData.author,
      text: commentData.text,
      createdAt: dateToTimestamp(date),
      updatedAt: dateToTimestamp(date),
    }

    const docRef = await addDoc(collection(db, 'comments'), newComment)
    const postRef = doc(db, 'posts', postId)
    await updateDoc(postRef, { commentsCount: increment(1) })

    const createdComment: Comment = {
      ...newComment,
      id: docRef.id,
      createdAt: timestampToDate(newComment.createdAt),
      updatedAt: timestampToDate(newComment.updatedAt),
    }

    return createdComment
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteComment = async (commentId: string, postId: string): Promise<void> => {
  try {
    const commentRef = doc(db, 'comments', commentId)
    await deleteDoc(commentRef)

    const postRef = doc(db, 'posts', postId)
    await updateDoc(postRef, { commentsCount: increment(-1) })
  } catch (error) {
    console.error(error)
    throw error
  }
}
