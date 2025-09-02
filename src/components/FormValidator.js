const FormValidator = (function () {
  const config = {
    formSelector: "form",
    titleSelector: "#title",
    authorSelector: "#author",
  };

  let formEl, inputTitle, inputAuthor;

  document.addEventListener("DOMContentLoaded", () => {
    formEl = document.querySelector(config.formSelector);
    inputTitle = formEl.querySelector(config.titleSelector);
    inputAuthor = formEl.querySelector(config.authorSelector);

    if (!formEl || !inputTitle || !inputAuthor) return;

    formEl.setAttribute("novalidate", "");
    inputTitle.addEventListener("input", () => validateInput(inputTitle));
    inputAuthor.addEventListener("input", () => validateInput(inputAuthor));
  });

  function validateInput(input) {
    const minLength = 2;
    const errorMessages = {
      title: "Please enter the book title",
      author: "Please enter the author's name",
    };

    if (input.value.trim().length < minLength) {
      showError(input, errorMessages[input.id]);
      return false;
    } else {
      removeError(input);
      return true;
    }
  }

  function showError(input, message) {
    input.classList.add("border-red-400");
    input.nextElementSibling.classList.add("opacity-100");
    input.nextElementSibling.textContent = message;
  }

  function removeError(input) {
    input.classList.remove("border-red-400");
    input.nextElementSibling.classList.remove("opacity-100");
    input.nextElementSibling.textContent = "";
  }

  function removeAllErrors() {
    if (inputTitle) removeError(inputTitle);
    if (inputAuthor) removeError(inputAuthor);
  }

  function resetForm() {
    removeAllErrors();

    if (formEl) formEl.reset();
  }

  return {
    validateInput,
    showError,
    removeError,
    removeAllErrors,
    resetForm,
  };
})();

export default FormValidator;
