import CONFIG from "./Config";

class Book {
  #status = CONFIG.STATUS.NOT_READ;
  #rating = "";

  constructor(title, author) {
    this.id = this.#generateRandomId();
    this.title = title;
    this.author = author;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      status: this.#status,
      rating: this.#rating,
    };
  }

  get status() {
    return this.#status;
  }

  set status(status) {
    const validStatuses = Object.values(CONFIG.STATUS);
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
    const validRatings = Object.values(CONFIG.RATING);
    if (!validRatings.includes(rating)) {
      throw new Error("Rate from 1 to 5");
    }
    this.#rating = rating;
  }

  #generateRandomId() {
    const array = new Uint32Array(2);
    crypto.getRandomValues(array);
    const id = array[0].toString(36) + array[1].toString(36);
    return id;
  }
}

export default Book;
