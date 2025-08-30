export const BOOK_STATUS = {
  READ: "read",
  NOT_READ: "not-read",
  READING: "reading",
};

export const BOOK_RATING = {
  1: "1/5",
  2: "2/5",
  3: "3/5",
  4: "4/5",
  5: "5/5",
};

export class Book {
  #status = BOOK_STATUS.NOT_READ;
  #rating = "";
  #id;
  #title;
  #author;

  #generateRandomId() {
    const array = new Uint32Array(2);
    crypto.getRandomValues(array);
    const id = array[0].toString(36) + array[1].toString(36);
    return id;
  }

  constructor(title, author) {
    this.#title = title;
    this.#author = author;
    this.#id = this.#generateRandomId();
  }

  get id() {
    return this.#id;
  }

  get author() {
    return this.#author;
  }

  set author(bookAuthor) {
    this.#author = bookAuthor;
  }

  get title() {
    return this.#title;
  }

  set title(bookTitle) {
    this.#title = bookTitle;
  }

  get status() {
    return this.#status;
  }

  set status(status) {
    const validStatuses = Object.values(BOOK_STATUS);
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Wrong status. Available statuses: ${validStatuses.join(", ")}`,
      );
    }
    this.#status = status;
  }

  get rating() {
    return this.#rating;
  }

  set rating(rating) {
    const validRatings = Object.values(BOOK_RATING);
    if (!validRatings.includes(rating)) {
      throw new Error("Rate from 1 to 5");
    }
    this.#rating = rating;
  }
}
