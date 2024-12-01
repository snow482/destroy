import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { BookService } from "../api";
import { Book, BookList } from "./index"

type RejectValue = {
  message: string
}

enum BOOK_THUNK_TYPES_INFO {
  CREATE_BOOK = 'book/createBook',
  GET_ALL_BOOKS = 'book/getAllBooks',
  UPDATE_BOOK = 'book/updateBook',
  DELETE_BOOK = 'book/deleteBook',
};

export const createBook = createAsyncThunk<
  Book,
  { title: string, author: string, pages: number, category_id: number },
  { rejectValue: RejectValue }
  >(BOOK_THUNK_TYPES_INFO.CREATE_BOOK, 
    async ({ title, author, pages, category_id }, { rejectWithValue }) => {
      try {
        return await BookService.createBook(title, author, pages, category_id)
      } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        });
      }
    }
  )

export const getAllBooks = createAsyncThunk<
  BookList,
  void,
  { rejectValue: RejectValue }
  >(BOOK_THUNK_TYPES_INFO.GET_ALL_BOOKS,
    async (_, { rejectWithValue }) => {
      try {
        return await BookService.getAllBooks()
      } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        });
      }
    }
  )

export const updateBook = createAsyncThunk<
  Book,
  { id: number, title: string, author: string, pages: number, category_id: number },
  { rejectValue: RejectValue }
  >(BOOK_THUNK_TYPES_INFO.UPDATE_BOOK, 
    async ({ id, title, author, pages, category_id }, { rejectWithValue }) => {
      try {
        return await BookService.updateBook(id, title, author, pages, category_id)
      } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        });
      }
    }
  )

export const deleteBook = createAsyncThunk<
  number,
  number,
  { rejectValue: RejectValue }
  >(BOOK_THUNK_TYPES_INFO.DELETE_BOOK, 
    async (id, { rejectWithValue }) => {
      try {
        return await BookService.deleteBook(id)
      } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue({
          message: err.response?.data.message || err.message
        });
      }
    }
  )
