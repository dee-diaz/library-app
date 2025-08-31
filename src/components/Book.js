import CONFIG from "./Config";

export class Book {
  status = CONFIG.STATUS.NOT_READ;
  rating = "";

  #generateRandomId() {
    const array = new Uint32Array(2);
    crypto.getRandomValues(array);
    const id = array[0].toString(36) + array[1].toString(36);
    return id;
  }

  constructor(title, author) {
    this.id = this.#generateRandomId();
    this.title = title;
    this.author = author;
  }

  get status() {
    return this.status;
  }

  set status(status) {
    const validStatuses = Object.values(CONFIG.STATUS);
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Wrong status. Available statuses: ${validStatuses.join(", ")}`,
      );
    }
    this.status = status;
  }

  get rating() {
    return this.rating;
  }

  set rating(rating) {
    const validRatings = Object.values(CONFIG.RATING);
    if (!validRatings.includes(rating)) {
      throw new Error("Rate from 1 to 5");
    }
    this.rating = rating;
  }
}

export default Book;