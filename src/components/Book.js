function Book(title, author, readingStatus, rating = null) {
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
  this.status = readingStatus;
  this.rating = rating;
}

Book.prototype.setStatus = function (status) {
  this.status = status;
  console.log(this);
};

Book.prototype.setRating = function(rating) {
  this.rating = rating;
  console.log(this);
}

export default Book;
