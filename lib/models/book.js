"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allBooks = () => {
    return "SELECT * FROM books";
};
const addBook = (s) => {
    return `INSERT INTO books (author, title, store) VALUES  ('${s.author}', '${s.title}','${s.store}') RETURNING *;`;
};
const deleteBook = (s) => {
    return `DELETE FROM books WHERE id = '${s.id}'`;
};
const updateBook = (s) => {
    return `UPDATE books SET store='${s.store}' WHERE id='${s.id}' RETURNING *`;
};
const findBook = (s) => {
    return `SELECT * From books WHERE id='${s.id}'`;
};
exports.default = {
    allBooks,
    addBook,
    deleteBook,
    updateBook,
    findBook
};
//# sourceMappingURL=book.js.map