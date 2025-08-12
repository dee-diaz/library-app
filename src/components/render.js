export function createBookCard(title, author, readingStatus, rating) {
  const STATUS = {
    READ: "read",
    NOTREAD: "not-read",
    READING: "reading",
  };

  const STATUS_MESSAGE = {
    READ: "Read",
    NOTREAD: "To read",
    READING: "In progress",
  };

  const bookCard = document.createElement("div");
  bookCard.className =
    "relative min-h-32 rounded-lg border border-b-primary bg-s-card p-4 transition-shadow duration-300 ease-out hover:shadow-card-hover active:shadow-card-hover md:p-5";

  const contextMenu = document.createElement("div");
  contextMenu.className =
    "group absolute top-3 right-3 flex cursor-pointer items-center gap-2 rounded-xl border border-b-primary bg-s-modal px-3 py-2.5";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute(
    "class",
    "-translate-y-px fill-t-secondary transition-colors duration-200 group-hover:fill-red-300 group-active:fill-red-400",
  );

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M15.1875 3.375H12.375V2.8125C12.375 2.36495 12.1972 1.93572 11.8807 1.61926C11.5643 1.30279 11.1351 1.125 10.6875 1.125H7.3125C6.86495 1.125 6.43572 1.30279 6.11926 1.61926C5.80279 1.93572 5.625 2.36495 5.625 2.8125V3.375H2.8125C2.66332 3.375 2.52024 3.43426 2.41475 3.53975C2.30926 3.64524 2.25 3.78832 2.25 3.9375C2.25 4.08668 2.30926 4.22976 2.41475 4.33525C2.52024 4.44074 2.66332 4.5 2.8125 4.5H3.375V14.625C3.375 14.9234 3.49353 15.2095 3.7045 15.4205C3.91548 15.6315 4.20163 15.75 4.5 15.75H13.5C13.7984 15.75 14.0845 15.6315 14.2955 15.4205C14.5065 15.2095 14.625 14.9234 14.625 14.625V4.5H15.1875C15.3367 4.5 15.4798 4.44074 15.5852 4.33525C15.6907 4.22976 15.75 4.08668 15.75 3.9375C15.75 3.78832 15.6907 3.64524 15.5852 3.53975C15.4798 3.43426 15.3367 3.375 15.1875 3.375ZM6.75 2.8125C6.75 2.66332 6.80926 2.52024 6.91475 2.41475C7.02024 2.30926 7.16332 2.25 7.3125 2.25H10.6875C10.8367 2.25 10.9798 2.30926 11.0852 2.41475C11.1907 2.52024 11.25 2.66332 11.25 2.8125V3.375H6.75V2.8125ZM13.5 14.625H4.5V4.5H13.5V14.625ZM7.875 7.3125V11.8125C7.875 11.9617 7.81574 12.1048 7.71025 12.2102C7.60476 12.3157 7.46168 12.375 7.3125 12.375C7.16332 12.375 7.02024 12.3157 6.91475 12.2102C6.80926 12.1048 6.75 11.9617 6.75 11.8125V7.3125C6.75 7.16332 6.80926 7.02024 6.91475 6.91475C7.02024 6.80926 7.16332 6.75 7.3125 6.75C7.46168 6.75 7.60476 6.80926 7.71025 6.91475C7.81574 7.02024 7.875 7.16332 7.875 7.3125ZM11.25 7.3125V11.8125C11.25 11.9617 11.1907 12.1048 11.0852 12.2102C10.9798 12.3157 10.8367 12.375 10.6875 12.375C10.5383 12.375 10.3952 12.3157 10.2898 12.2102C10.1843 12.1048 10.125 11.9617 10.125 11.8125V7.3125C10.125 7.16332 10.1843 7.02024 10.2898 6.91475C10.3952 6.80926 10.5383 6.75 10.6875 6.75C10.8367 6.75 10.9798 6.80926 11.0852 6.91475C11.1907 7.02024 11.25 7.16332 11.25 7.3125Z",
  );
  svg.appendChild(path);

  const spanDelete = document.createElement("span");
  spanDelete.textContent = "Delete";
  spanDelete.className =
    "font-medium text-t-primary transition-colors duration-200 group-hover:text-red-300 group-active:text-red-400";

  contextMenu.appendChild(svg);
  contextMenu.appendChild(spanDelete);

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

  const statusCont = document.createElement("div");
  statusCont.className = "flex items-center gap-2";

  const icon = document.createElement("img");

  const statusText = document.createElement("span");
  statusText.className = "text-sm";

  switch (readingStatus) {
    case STATUS.READ:
      icon.src = "/check.svg";
      statusText.textContent = STATUS_MESSAGE.READ;
      statusText.classList.add("text-status-completed");
      break;
    case STATUS.NOTREAD:
      icon.src = "/bookmark.svg";
      statusText.textContent = STATUS_MESSAGE.NOTREAD;
      statusText.classList.add("text-status-to-read");
      break;
    case STATUS.READING:
      icon.src = "/eye.svg";
      statusText.textContent = STATUS_MESSAGE.READING;
      statusText.classList.add("text-status-reading");
      break;
  }

  const ratingCont = document.createElement("div");
  ratingCont.className = "flex items-center gap-2";
  const ratingIcon = document.createElement("img");
  ratingIcon.className = "-translate-y-px";
  ratingIcon.src = "/star.svg";
  const ratingText = document.createElement("span");
  ratingText.className = "text-t-secondary";
  ratingText.innerText = `${rating}`;

  ratingCont.appendChild(ratingIcon);
  ratingCont.appendChild(ratingText);


  statusCont.appendChild(icon);
  statusCont.appendChild(statusText);

  bookCard.appendChild(contextMenu);
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(statusCont);
  bookCard.appendChild(ratingCont);
}

const mainContentParent = document.querySelector("main");

export function renderLayout() {
  const mainBookContainer = document.createElement("div");
  mainBookContainer.id = "book-cards";

  const sectionsContainer = document.createElement("section");
  sectionsContainer.className = "grid gap-12";


  mainBookContainer.appendChild(sectionsContainer);
  mainContentParent.appendChild(mainBookContainer);
}


export function createSection(name) {
  const section = document.createElement("section");

}