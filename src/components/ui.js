import CONFIG from "./Config.js";
import Storage from "./Storage.js";

function createEmptyCardEl() {
  const cardEmpty = document.createElement("div");
  cardEmpty.id = "card-empty";
  cardEmpty.className =
    "mx-auto w-fit rounded-xl border border-b-primary bg-s-card px-6 py-12 text-center md:px-8 md:py-16";

  const heading = document.createElement("h1");
  heading.className =
    "mb-4 max-w-64 text-2xl text-t-primary md:max-w-96 md:text-4xl";
  heading.textContent = "Your digital shelf is ready";

  const para = document.createElement("p");
  para.className = "mb-8 max-w-64 text-base text-t-secondary md:max-w-80";
  para.textContent =
    "Start building your personal library by adding your first book";

  const button = document.createElement("button");
  button.setAttribute("data-btn-add", "");
  button.setAttribute("type", "button");
  button.className =
    "m-auto flex items-center gap-2 rounded-lg bg-s-btn-primary px-2.5 py-2 transition-colors duration-300 ease-out hover:bg-s-btn-primary-hover md:px-3 md:py-2.5";

  const span = document.createElement("span");
  span.className = "translate-y-[1px] text-base leading-5 font-medium";
  span.textContent = "Add your first book";

  button.appendChild(span);

  cardEmpty.appendChild(heading);
  cardEmpty.appendChild(para);
  cardEmpty.appendChild(button);

  return cardEmpty;
}

function renderEmptyStateCard() {
  const mainContainer = document.querySelector("#main-content");
  const cardEmpty = createEmptyCardEl();
  mainContainer.appendChild(cardEmpty);
}

function createBookCardEl(id, title, author, readingStatus, rating) {
  const bookCard = document.createElement("div");
  bookCard.className =
    "card relative min-h-32 cursor-pointer rounded-lg border border-b-primary bg-s-card p-4 transition-shadow duration-300 ease-out hover:shadow-card-hover active:shadow-card-hover md:p-5";
  bookCard.setAttribute("data-id", id);

  const contextMenu = document.createElement("div");
  contextMenu.className =
    "hidden absolute top-3 right-3 z-10 w-28 flex-col overflow-hidden rounded-xl border border-b-primary bg-s-modal";
  contextMenu.setAttribute("data-context-menu", "");
  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("data-btn-edit", "");
  btnEdit.className =
    "flex items-center gap-2 border-b border-b-b-primary py-2 transition-colors duration-200 hover:bg-[#0C0C0D]";
  const btnEditIcon = document.createElement("img");
  btnEditIcon.src = "/edit.svg";
  btnEditIcon.className = "pl-3";
  const btnEditText = document.createElement("span");
  btnEditText.className = "font-medium text-t-primary";
  btnEditText.textContent = "Edit";
  btnEdit.appendChild(btnEditIcon);
  btnEdit.appendChild(btnEditText);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("data-btn-delete", "");
  btnDelete.className =
    "flex items-center gap-2 py-2 transition-colors duration-200 hover:bg-[#0C0C0D]";
  const btnDeleteIcon = document.createElement("img");
  btnDeleteIcon.src = "/delete.svg";
  btnDeleteIcon.className = "pl-3";
  const btnDeleteText = document.createElement("span");
  btnDeleteText.className = "font-medium text-t-primary";
  btnDeleteText.textContent = "Delete";
  btnDelete.appendChild(btnDeleteIcon);
  btnDelete.appendChild(btnDeleteText);

  contextMenu.appendChild(btnEdit);
  contextMenu.appendChild(btnDelete);

  const bookTitle = document.createElement("h3");
  bookTitle.className =
    "mb-2 overflow-hidden text-base font-medium text-ellipsis whitespace-nowrap text-t-primary capitalize";
  bookTitle.setAttribute("data-title", ""); // Delete later if not used
  bookTitle.textContent = `${title}`;

  const bookAuthor = document.createElement("p");
  bookAuthor.className = "mb-3 text-base text-t-secondary";
  bookAuthor.textContent = "by ";

  const name = document.createElement("span");
  name.className = "capitalize";
  name.textContent = `${author}`;

  bookAuthor.appendChild(name);

  const bottomCont = document.createElement("div");
  bottomCont.className = "flex justify-between";

  const statusCont = document.createElement("div");
  statusCont.className = "flex items-center gap-2";

  const icon = document.createElement("img");

  const statusText = document.createElement("span");
  statusText.className = "text-sm";

  switch (readingStatus) {
    case CONFIG.STATUS.READ:
      icon.src = "/check.svg";
      statusText.textContent = CONFIG.STATUS_MESSAGE.READ;
      statusText.classList.add("text-status-completed");
      break;
    case CONFIG.STATUS.NOT_READ:
      icon.src = "/bookmark.svg";
      statusText.textContent = CONFIG.STATUS_MESSAGE.NOT_READ;
      statusText.classList.add("text-status-to-read");
      break;
    case CONFIG.STATUS.READING:
      icon.src = "/eye.svg";
      statusText.textContent = CONFIG.STATUS_MESSAGE.READING;
      statusText.classList.add("text-status-reading");
      break;
  }

  const ratingCont = document.createElement("div");
  ratingCont.className = "hidden items-center gap-2";
  const ratingIcon = document.createElement("img");
  ratingIcon.className = "-translate-y-px";
  ratingIcon.src = "/star.svg";
  const ratingText = document.createElement("span");
  ratingText.className = "text-t-secondary";
  ratingText.innerText = `${rating}`;
  if (readingStatus === CONFIG.STATUS.READ && rating !== "") {
    ratingCont.classList.remove("hidden");
    ratingCont.classList.add("flex");
  } else {
    ratingCont.classList.remove("flex");
    ratingCont.classList.add("hidden");
  }

  ratingCont.appendChild(ratingIcon);
  ratingCont.appendChild(ratingText);

  statusCont.appendChild(icon);
  statusCont.appendChild(statusText);

  bottomCont.appendChild(statusCont);
  bottomCont.appendChild(ratingCont);

  bookCard.appendChild(contextMenu);
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bottomCont);

  return bookCard;
}

function renderBookCard(id, title, author, readingStatus, rating) {
  const bookCard = createBookCardEl(id, title, author, readingStatus, rating);

  let section;

  switch (readingStatus) {
    case CONFIG.STATUS.READ:
      section = CONFIG.SECTIONS.COMPLETED;
      break;
    case CONFIG.STATUS.NOT_READ:
      section = CONFIG.SECTIONS.TO_READ;
      break;
    case CONFIG.STATUS.READING:
      section = CONFIG.SECTIONS.READING;
      break;
    default:
      section = CONFIG.SECTIONS.TO_READ;
      break;
  }

  const gridContainer = section.querySelector(".grid");
  showSectionAndTitle(section);
  gridContainer.appendChild(bookCard);
}

function showSectionAndTitle(section) {
  const title = section.querySelector("[data-section-title]");
  if (
    title.classList.contains("hidden") &&
    section.classList.contains("hidden")
  ) {
    title.classList.remove("hidden");
    section.classList.remove("hidden");
  }
}

function hideSectionAndTitle(section) {
  if (!section.querySelector(".card")) {
    const title = section.querySelector("[data-section-title]");
    title.classList.add("hidden");
    section.classList.add("hidden");
  }
}

function displayBookCard(book) {
  const bookCard = renderBookCard(
    book.id,
    book.title,
    book.author,
    book.status,
    book.rating,
  );

  removeEmptyCard();
}

function removeEmptyCard() {
  const emptyCard = document.querySelector("#card-empty");
  if (emptyCard) {
    emptyCard.remove();
  }
}

function showCards() {
  const books = Storage.getBooks();
  if (books.length === 0) {
    renderEmptyStateCard();
    console.log("No books in local storage");
  } else {
    books.forEach((book) => displayBookCard(book));
  }
}

export default {
  createEmptyCardEl,
  renderEmptyStateCard,
  createBookCardEl,
  renderBookCard,
  showSectionAndTitle,
  hideSectionAndTitle,
  displayBookCard,
  removeEmptyCard,
  showCards,
};
