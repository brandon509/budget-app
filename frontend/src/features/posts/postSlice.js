import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    data: [],
    message: ''
}

export const getAmounts = createAsyncThunk(
    'posts/getAmounts',
    async (timePeriod, thunkAPI) => {
        try {
            return await postService.getAmounts(timePeriod)
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

export const newAmount = createAsyncThunk(
    'posts/newAmount',
    async (amount, thunkAPI) => {
        try {
            return await postService.newAmount(amount)
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

export const updateAmount = createAsyncThunk(
    'posts/updateAmount',
    async (amount, thunkAPI) => {
        try {
            return await postService.updateAmount(amount)
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

export const deleteAmount = createAsyncThunk(
    'posts/deleteAmount',
    async (amount, thunkAPI) => {
        try {
            return await postService.deleteAmount(amount)
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

export const postSlice = createSlice({
    name: 'posts',
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
            .addCase(getAmounts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAmounts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload.amounts
            })
            .addCase(getAmounts.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(newAmount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(newAmount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data.push(action.payload)
                state.data = state.data.sort((a,b) => a.dateIncurred - b.dateIncurred)
            })
            .addCase(newAmount.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateAmount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAmount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = state.data.filter(x => x._id != action.payload._id)
                state.data.push(action.payload)
                state.data = state.data.sort((a,b) => a.dateIncurred - b.dateIncurred)
            })
            .addCase(updateAmount.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAmount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAmount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = state.data.filter(x => x._id != action.payload)
            })
            .addCase(deleteAmount.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = postSlice.actions
export default postSlice.reducer