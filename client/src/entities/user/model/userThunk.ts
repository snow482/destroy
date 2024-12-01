import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserWithoutPasswordType } from './index'
import { UserService } from "../api";

// Определяем тип RejectValue для значения rejectWithValue
type RejectValue = {
    message: string;
};

// Создаем перечисление с префиксом типов для уникальных имен действий
enum USER_THUNK_TYPES_PREFIX {
  USER_AUTHORIZATION = 'user/authorization',
  USER_REGISTRATION = 'user/registration',  
  USER_REFRESH_ACCESS_TOKEN = 'user/refreshAccessToken',
  USER_LOGOUT = 'user/logout',
};

export type AuthResponse = {
  accessToken: string;
  user: UserWithoutPasswordType;
}

export const registration = createAsyncThunk<
  // типизация полезной нагузки
  AuthResponse,
  // типизация передаваемого параметра (объект с ключами)
  { email: string, password: string },
  // типизация ошибки, в случае отработки catch  
  { rejectValue: RejectValue }
  > (
    // описание операции для redux devtool в браузере 
    USER_THUNK_TYPES_PREFIX.USER_REGISTRATION,
    // передача полезной нагрузки и reject сообщения
    async ({ email, password }, { rejectWithValue }) => {
      try {
        return await UserService.registration(email, password)
      } catch (error) {
        // Обрабатываем ошибку, приводя ее к типу AxiosError
      const err = error as AxiosError<{ message: string }>
      // Возвращаем значение rejectWithValue с сообщением об ошибке
      return rejectWithValue({
          message: err.response?.data.message || err.message
      });
      }
    })

export const authorization = createAsyncThunk<
  AuthResponse,
  { email: string, password: string },
  { rejectValue: RejectValue }
    >(USER_THUNK_TYPES_PREFIX.USER_AUTHORIZATION, async ({ email, password }, { rejectWithValue }) => {
      try {
        return await UserService.authorization(email, password)
      } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        })
      }
    })

export const refreshAccessToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: RejectValue}
  >(USER_THUNK_TYPES_PREFIX.USER_REFRESH_ACCESS_TOKEN, async (_, { rejectWithValue }) => {
    try {
      return await UserService.refreshAccessToken()
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        })
      }
  })

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: RejectValue }
  >(USER_THUNK_TYPES_PREFIX.USER_LOGOUT, async (_, { rejectWithValue }) => {
    try {
      await UserService.logout()
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        })
    }
  })