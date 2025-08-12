function renderEmptyStateCard() {
  const mainContainer = document.querySelector("#main-content");

  const cardEmpty = document.createElement("div");
  cardEmpty.id = "card-empty";
  cardEmpty.className = "mx-auto w-fit rounded-xl border border-b-primary bg-s-card px-6 py-12 text-center md:px-8 md:py-16";

  const heading = document.createElement("h1");
  heading.className = "mb-4 max-w-64 text-2xl text-t-primary md:max-w-96 md:text-4xl";
  heading.textContent = "Your digital shelf is ready";

  const para = document.createElement("p");
  para.className = "mb-8 max-w-64 text-base text-t-secondary md:max-w-80";
  para.textContent = "Start building your personal library by adding your first book";

  const button = document.createElement("button");
  button.setAttribute("data-btn-add", "");
  button.setAttribute("type", "button");
  button.className = "m-auto flex items-center gap-2 rounded-lg bg-s-btn-primary px-2.5 py-2 transition-colors duration-300 ease-out hover:bg-s-btn-primary-hover md:px-3 md:py-2.5";

  const span = document.createElement("span");
  span.className = "translate-y-[1px] text-base leading-5 font-medium";
  span.textContent = "Add your first book";

  button.appendChild(span);

  cardEmpty.appendChild(heading);
  cardEmpty.appendChild(para);
  cardEmpty.appendChild(button);

  mainContainer.appendChild(cardEmpty);
}

export default renderEmptyStateCard;