import { createSlice } from "@reduxjs/toolkit"
import { UserWithoutPasswordType } from ".";
import { refreshAccessToken, registration, authorization, logout } from "./userThunk";

type UserState = {
  user: UserWithoutPasswordType | null
  error: string | null
  loading: boolean
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.error = null
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Registration fail"
      })

      .addCase(authorization.pending, (state) => {
        state.loading = true
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.error = null
      })
      .addCase(authorization.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Authorization fail"       
      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.error = null
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "RefreshToken fail"       

      })

      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || "Logout fail"       
      })
  }
})

// Экспортируем редьюсер для использования в store
export default userSlice.reducer;