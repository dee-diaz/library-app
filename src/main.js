import "./app.css";
import ui from "./components/ui.js";
import { initModal } from "./components/Modal.js";
import { toggleContextMenu } from "./components/contextMenuUtils.js";



function initApp() {
  ui.showCards();
  initModal();
  window.addEventListener("click", toggleContextMenu);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});