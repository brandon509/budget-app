import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import investmentService from "./investmentService"

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  investments: [],
  message: "",
}

export const getInvestments = createAsyncThunk(
  "investments/getInvestments",
  async (thunkAPI) => {
    try {
      return await investmentService.getInvestments()
    } catch (error) {
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

export const newInvestment = createAsyncThunk(
  "investments/newInvestments",
  async (investment, thunkAPI) => {
    try {
      return await investmentService.newInvestment(investment)
    } catch (error) {
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

export const deleteInvestment = createAsyncThunk(
  "investments/deleteInvestments",
  async (investment, thunkAPI) => {
    try {
      return await investmentService.deleteInvestment(investment)
    } catch (error) {
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

export const updateInvestment = createAsyncThunk(
  "investments/updateInvestment",
  async (investment, thunkAPI) => {
    try {
      return await investmentService.updateInvestment(investment)
    } catch (error) {
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

export const investmentSlice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvestments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.investments = action.payload.investments
      })
      .addCase(getInvestments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(newInvestment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(newInvestment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.investments.push(action.payload.investment)
      })
      .addCase(newInvestment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteInvestment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.investments = state.investments.filter(
          (x) => x._id != action.payload
        )
      })
      .addCase(deleteInvestment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateInvestment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateInvestment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.investments = state.investments.filter(
          (x) => x._id != action.payload._id
        )
        state.investments.push(action.payload)
      })
      .addCase(updateInvestment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = investmentSlice.actions
export default investmentSlice.reducer
