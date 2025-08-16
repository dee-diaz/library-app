function Book(title, author) {
  if (!new.target)
    throw Error("You must use the 'new' operator to call the constructor");

  Object.defineProperty(this, "id", {
    value: generateRandomID(),
    writable: true,
    enumerable: true,
    configurable: false,
  });
  this.title = title;
  this.author = author;
  this.status = "not-read";
  this.rating = "";
}

Book.prototype.setStatus = function (status) {
  this.status = status;
};

Book.prototype.setRating = function (rating) {
  this.rating = rating;
};

function generateRandomID() {
  const array = new Uint32Array(2);
  crypto.getRandomValues(array);
  const id = array[0].toString(36) + array[1].toString(36);
  return id;
}

export default Book;
