import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import postReducer from "../features/posts/postSlice"
import categoryReducer from "../features/categories/categorySlice"
import investmentReducer from "../features/investments/investmentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    category: categoryReducer,
    investment: investmentReducer,
  },
})
