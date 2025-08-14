function Storage() {
  if (!new.target)
    throw Error("You must use the 'new' operator to call the constructor");
}

Storage.prototype.getBooks = function () {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};

Storage.prototype.saveBook = function (book) {
  const books = this.getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  console.table(books);
};

Storage.prototype.deleteBook = function (id) {
  const books = this.getBooks();
  books.forEach((book, index) => {
    if (book.id === id) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
};

export default Storage;
