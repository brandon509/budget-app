import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    categories: [],
    message: ''
}

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (thunkAPI) => {
        try {
            return await categoryService.getCategories()
        }
        catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
)

export const newCategory = createAsyncThunk(
    'categories/newCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.newCategory(category)
        }
        catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.deleteCategory(category)
        }
        catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.updateCategory(category)
        }
        catch (error) {
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
)

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(newCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories.push(action.payload)
            })
            .addCase(newCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories = action.payload
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories = action.payload
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        }
    })

    export const { reset } = categorySlice.actions
    export default categorySlice.reducer