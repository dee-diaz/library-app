const CONFIG = {
  STATUS: {
    READ: "read",
    NOT_READ: "not-read",
    READING: "reading",
  },

  STATUS_MESSAGE: {
    READ: "Read",
    NOT_READ: "To read",
    READING: "In progress",
  },

  RATING: {
    ONE: "1/5",
    TWO: "2/5",
    THREE: "3/5",
    FOUR: "4/5",
    FIVE: "5/5",
  },

  SECTIONS: {
    READING: document.querySelector("#reading"),
    TO_READ: document.querySelector("#to-read"),
    COMPLETED: document.querySelector("#completed"),
  },
};

export default CONFIG;
