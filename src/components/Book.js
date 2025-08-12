function Book(title, author) {
  if (!new.target)
    throw Error("You must use the 'new' operator to call the constructor");

  Object.defineProperty(this, "id", {
    value: crypto.randomUUID(),
    writable: false,
    enumerable: true,
    configurable: false,
  });
  this.title = title;
  this.author = author;
  this.status = "";
  this.rating = "";
}

Book.prototype.setStatus = function (status) {
  this.status = status;
};

Book.prototype.setRating = function(rating) {
  this.rating = rating;
}

export default Book;
