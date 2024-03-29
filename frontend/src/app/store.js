import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import postReducer from "../features/posts/postSlice"
import categoryReducer from "../features/categories/categorySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    category: categoryReducer,
  },
})
