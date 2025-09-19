import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchComments as fetchCommentsService,
  addComment as addCommentService,
  deleteComment as deleteCommentService,
} from '@/services/commentsService'

import type { Comment, CommentFormData } from '@/types/comment'

type CommentsState = {
  loading: boolean
  comments: Comment[]
  error: string | null
}

const initialState: CommentsState = {
  loading: false,
  comments: [],
  error: null,
}

export const fetchComments = createAsyncThunk('comments/fetchComments', (postId: string) => {
  return fetchCommentsService(postId)
})

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (
    { postId, commentData }: { postId: string; commentData: CommentFormData },
    { dispatch }
  ) => {
    const comment = await addCommentService(postId, commentData)
    // Update counter
    dispatch({ type: 'posts/updateCommentsCount', payload: { postId, delta: 1 } })

    return comment
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ commentId, postId }: { commentId: string; postId: string }, { dispatch }) => {
    await deleteCommentService(commentId, postId)
    // Update counter
    dispatch({ type: 'posts/updateCommentsCount', payload: { postId, delta: -1 } })

    return commentId
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch comments'
      })

      // Add comment
      .addCase(addComment.pending, (state) => {
        state.error = null
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload)
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add comment'
      })

      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c.id !== action.payload)
      })
  },
})

export default commentsSlice.reducer
