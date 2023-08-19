import { BookProps } from "../type"

const allBooks = ()=>{
      return "SELECT * FROM books"
}

const addBook = (s:BookProps)=>{
      return `INSERT INTO books (author, title, store) VALUES  ('${s.author}', '${s.title}','${s.store}') RETURNING *;`
}

const deleteBook = (s:BookProps)=>{
      return `DELETE FROM books WHERE id = '${s.id}'`
}
const updateBook = (s:BookProps)=>{
      return `UPDATE books SET store='${s.store}' WHERE id='${s.id}' RETURNING *`
}

const findBook = (s:BookProps)=>{
      return `SELECT * From books WHERE id='${s.id}'`
}

export default {
      allBooks,
      addBook,
      deleteBook,
      updateBook,
      findBook
} 