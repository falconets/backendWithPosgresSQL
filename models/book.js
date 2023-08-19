const allBooks = ()=>{
      return "SELECT * FROM books"
}

const addBook = (author, title, store)=>{
      return `INSERT INTO books (author, title, store) VALUES  ('${author}', '${title}','${store}') RETURNING *;`
}

const deleteBook = (id)=>{
      return `DELETE FROM books WHERE id = '${id}'`
}
const updateBook = (id, store)=>{
      return `UPDATE books SET store='${store}' WHERE id='${id}' RETURNING *`
}

export default {
      allBooks,
      addBook,
      deleteBook,
      updateBook
} 