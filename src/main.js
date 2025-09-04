import "./app.css";
import ui from "./components/ui.js";
import { initAddBookButtons, modal } from "./components/Modal.js";
import { toggleContextMenu, initContextMenuHandlers } from "./components/contextMenuUtils.js";


function initApp() {
  ui.showCards();
  initAddBookButtons(modal);
  window.addEventListener("click", toggleContextMenu);
  initContextMenuHandlers();
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});