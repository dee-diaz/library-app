class Storage {
  static getBooks() {
    try {
      return JSON.parse(localStorage.getItem("books") || "[]");
    } catch (error) {
      console.warn("Error loading books:", error);
      return [];
    }
  }

  static saveBook(book) {
    const books = this.getBooks();
    books.push(book.toJSON());
    localStorage.setItem("books", JSON.stringify(books));
    console.table(books);
  }

  static deleteBook(id) {
    const books = this.getBooks();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
    console.table(books);
  }

  static getBookInfo(id) {
    const books = this.getBooks();
    console.log(books.find((book) => book.id === id));
    return books.find((book) => book.id === id);
  }
}

export default Storage;
