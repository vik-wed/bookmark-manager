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

let userInput = [];
const addBookmarkBttn = document.querySelector(".add-button");
const inputURL = document.querySelector(".input-url");
const inputName = document.querySelector(".input-name");

addBookmarkBttn.addEventListener("click", () => {
  userInput.push({ url: inputURL.value, name: inputName.value });
  inputURL.value = "";
  inputName.value = "";
  renderAllBookmarks(userInput);
});

const removeBookmark = (userInput, bookmark) => {
  // Can you find the book?
  const idx = userInput.indexOf(bookmark);
  if (idx !== -1) {
    // If the book was found, remove it
    return userInput.slice(0, idx).concat(userInput.slice(idx + 1));
  } else {
    // Otherwise, it's the same bookshelf
    return userInput;
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
    const updatedBookmarks = removeBookmark(userInput, bookmark);
    userInput = updatedBookmarks;
    renderAllBookmarks(userInput);
  });

  li.append(link);
  li.prepend(removeBtn);
  return li;
};

const renderAllBookmarks = (userInput) => {
  const ul = document.querySelector("ul");

  const renderedBookmarks = userInput.map(renderBookmark);
  ul.replaceChildren(...renderedBookmarks);

  return ul;
};
