// Fetching the data from the Stephen King API
const apiURL = "https://stephen-king-api.onrender.com/api/books";
const booksContainer = document.getElementById("books-container");

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    data.books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.className = "book-item";

      // Adding book title and author
      bookItem.innerHTML = `<h3>${book.title}</h3><p>${book.author}</p>`;
      booksContainer.appendChild(bookItem);
    });
  })
  .catch((error) => console.error("Error fetching data: ", error));

//ANIMATION ABOUT
