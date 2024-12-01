import { createSlice } from "@reduxjs/toolkit";
import { BookList } from ".";
import { createBook, getAllBooks, updateBook, deleteBook } from "./bookThunk";

// Определяем тип состояния для хранилища пользователя
type BookState = {
  books: BookList;
  error: string | null;
  loading: boolean;
};

// Устанавливаем начальное состояние
const initialState: BookState = {
  books: [],
  error: null,
  loading: false,
};

const bookSlice = createSlice({
  name: "books", // Имя слайса для генерации типов действий
  initialState, // Начальное состояние
  reducers: {}, // Здесь можно определить синхронные редьюсеры
  extraReducers: (builder) => {
    builder
    .addCase(createBook.pending, (state) => {
      state.loading = true; // Устанавливаем состояние загрузки в true
    })
    .addCase(createBook.fulfilled, (state, action) => {
      state.loading = false; // Устанавливаем состояние загрузки в false

      state.books = [...state.books, action.payload ]; // Обновляем пользователя
      state.error = null; // Очищаем ошибку
    })
    .addCase(createBook.rejected, (state) => {
      state.loading = false; // Устанавливаем состояние загрузки в false
    })

    .addCase(getAllBooks.pending, (state) => {
      state.loading = true; // Устанавливаем состояние загрузки в true
    })
    .addCase(getAllBooks.fulfilled, (state, action) => {
      state.loading = false; // Устанавливаем состояние загрузки в false
      state.books = action.payload; // Обновляем пользователя
      state.error = null; // Очищаем ошибку
    })
    .addCase(getAllBooks.rejected, (state) => {
      state.loading = false; // Устанавливаем состояние загрузки в false
    })

    .addCase(updateBook.pending, (state) => {
      state.loading = true; // Устанавливаем состояние загрузки в true
    })
    .addCase(updateBook.fulfilled, (state, action) => {
      state.loading = false; // Устанавливаем состояние загрузки в false

      state.books = state.books.map((book) => {
        return book.id === action.payload.id ? action.payload : book
      }); // Обновляем пользователя
      state.error = null; // Очищаем ошибку
    })
    .addCase(updateBook.rejected, (state) => {
      state.loading = false; // Устанавливаем состояние загрузки в false
    })

    .addCase(deleteBook.pending, (state) => {
      state.loading = true; // Устанавливаем состояние загрузки в true
    })
    .addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false; // Устанавливаем состояние загрузки в false
      state.books = state.books.filter(book => book.id !== action.payload); // Обновляем пользователя
      state.error = null; // Очищаем ошибку
    })
    .addCase(deleteBook.rejected, (state) => {
      state.loading = false; // Устанавливаем состояние загрузки в false
    })
  }
})

export default bookSlice.reducer;