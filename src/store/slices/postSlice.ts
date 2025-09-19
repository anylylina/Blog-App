import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchPosts as fetchPostsService,
  createPost as createPostService,
  updatePost as updatePostService,
} from '@/services/postsService'

import type { Post } from '@/types/post'
import type { PostFormData } from '@/schemas/createPostSchema'

type PostsState = {
  loading: boolean
  posts: Post[]
  error: string | null
}

const initialState: PostsState = {
  loading: false,
  posts: [],
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => {
  return fetchPostsService()
})

export const createPost = createAsyncThunk('posts/createPost', (newPost: PostFormData) => {
  return createPostService(newPost)
})

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  (data: { postId: Post['id']; postData: PostFormData }) => {
    return updatePostService(data.postId, data.postData)
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateCommentsCount: (state, action) => {
      const { postId, delta } = action.payload
      const post = state.posts.find((p) => p.id === postId)
      if (post) {
        post.commentsCount += delta
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error loading posts'
      })

      // createPost
      .addCase(createPost.pending, (state) => {
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts]
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message || 'Error crate post'
      })

      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.error = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message || 'Error update post'
      })
  },
})

export const { updateCommentsCount } = postsSlice.actions
export default postsSlice.reducer
