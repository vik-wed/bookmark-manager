// Create index.js and link to it in your HTML file.

// Your code should do the following:

// Maintain an array of objects representing all of the user's added bookmarks.
// Re-render the entire list of bookmarks any time a bookmark is added or removed.
// Use map to map the bookmark array to DOM elements.
// Here are some guiding questions:

// What event listeners do you need to start off with?
// Can you correctly add bookmarks?
// What UI element allows a user to remove a previously added bookmark?
// How can you make sure that the correct bookmark is removed?
const useState = (initial) => {
  let closure = initial;
  const getState = () => closure;
  const setState = (update) => (closure = update);
  return [getState, setState];
};

const [getBookmark, setBookmark] = useState([]);

// let userInput = getBookmark();
const addBookmarkBttn = document.querySelector(".add-button");
const inputURL = document.querySelector(".input-url");
const inputName = document.querySelector(".input-name");

inputName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBookmarkBttn.click();
  }
});

addBookmarkBttn.addEventListener("click", () => {
  const userInput = getBookmark();
  userInput.push({ url: inputURL.value, name: inputName.value });
  inputURL.value = "";
  inputName.value = "";
  renderAllBookmarks(userInput);
});

const removeBookmark = (bookmarks, bookmark) => {
  // Can you find the book?
  const idx = bookmarks.indexOf(bookmark);
  if (idx !== -1) {
    // If the book was found, remove it
    return bookmarks.slice(0, idx).concat(bookmarks.slice(idx + 1));
  } else {
    // Otherwise, it's the same bookshelf
    return bookmarks;
  }
};

//==========================
//#region Rendering
//==========================

const renderBookmark = (bookmark) => {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = `${bookmark.url}`;
  link.target = "_blank";
  link.textContent = `${bookmark.name}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "-";
  removeBtn.addEventListener("click", () => {
    const bookmarks = getBookmark();
    const updatedBookmarks = removeBookmark(bookmarks, bookmark);
    // userInput = updatedBookmarks;
    setBookmark(updatedBookmarks);
    renderAllBookmarks();
  });

  li.append(link);
  li.prepend(removeBtn);
  return li;
};

const renderAllBookmarks = () => {
  const ul = document.querySelector("ul");
  const bookmarks = getBookmark();
  const renderedBookmarks = bookmarks.map(renderBookmark);
  ul.replaceChildren(...renderedBookmarks);

  return ul;
};
