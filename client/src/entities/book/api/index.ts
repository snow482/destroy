import { axiosInstance } from "@/shared/lib/axiosInstance";
import { Book, BookList} from "@/entities/book/model"

enum ROUTES {
  BOOKS = '/books'
}

export class BookService {
  static async createBook(
    title: string,
    author: string,
    pages: number,
    category_id: number,
  ): Promise<Book> {
    const response = await axiosInstance.post(ROUTES.BOOKS, {
      title,
      author,
      pages,
      category_id,
    })
    return response.data.book
  }

  static async getAllBooks(): Promise<BookList> {
    const response = await axiosInstance.get(ROUTES.BOOKS)
    console.log(2222,response.data);
    
    return response.data.books
  }

  static async updateBook(
    id: number,
    title: string,
    author: string,
    pages: number,
    category_id: number,
  ): Promise<Book> {
    const response = await axiosInstance.put(`${ROUTES.BOOKS}/${id}`, {
      id,
      title,
      author,
      pages,
      category_id,
    })
    return response.data.book
  }

  static async deleteBook(id: number): Promise<number> {
    await axiosInstance.delete(`${ROUTES.BOOKS}/${id}`)
    return id
  }
}