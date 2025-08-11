function Book(title, author, readingStatus) {
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
}

Book.prototype.changeStatus = function (status) {
  this.status = status;
  console.log(this);
};

export default Book;
