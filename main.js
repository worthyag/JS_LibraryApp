// Stores all the book objects.
const myLibrary = [];

// Book class.
class Book {
  constructor (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? 'read' : 'not read yet'}.`
  }
}

// Adding books to library for testing purposes.
const book1 = new Book('The Hobbit', 'Yetty', 176,'Not yet read');
const book2 = new Book('Matilda', 'Roald Dahl', 24, 'Read');
const book3 = new Book('Look over there', 'Stephany Green', 55, 'Read');
const book4 = new Book('The other side', 'Mick Lard', 128, 'Not yet read');
const book5 = new Book('The magic key', 'J.L. Minnings', 1031, 'Read');
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);

// Adds books to the library (the myLibrary array).
function addBookToLibrary(event) {
  event.preventDefault(); // Prevent the default form submission behaviour.
  // alert("Form submitted!");

  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;
  const pages = Number(document.querySelector('#book-pages').value);
  const read = [...document.getElementsByName('book-read')].filter((radio) => {
    return radio.checked;
  })[0].value;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  // Clear the form field.
  const form = event.target;
  form.reset();

  displayBooks();
}

// Calling addBookToLibrary function when the user submits the form.
const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener('submit', addBookToLibrary)

// Displays books on the page.
function displayBooks() {
  const bookShelf = document.querySelector('.view-books');
  bookShelf.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');

    const switchRead = `<span>
    <label for="switch-read" class="read-label"></label>
    <input data-switchId="${index}" type="checkbox" class="switch-read" name="user-read" value="Read" checked/>
  </span>`;

  const switchNotRead = `<span>
    <label for="switch-read" class="read-label"></label>
    <input data-switchId="${index}" type="checkbox" class="switch-read" name="user-read" value="Not yet read" />
  </span>`;

    bookDiv.innerHTML = `
    <p><span>Title</span> ${book.title}</p>
    <p><span>Author</span> ${book.author}</p>
    <p><span>Pages</span> ${book.pages}</p>
    <p><span>Read</span> ${book.read === 'Read' ? switchRead : switchNotRead}</p>
    <button class="delete-btn" data-id="${index}">Delete</button>
    `;

    bookShelf.appendChild(bookDiv);
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteBook(btn.dataset.id);
    });
  });

  const toggleReadButtons = document.querySelectorAll('.switch-read');
  toggleReadButtons.forEach((btn) => {
    btn.addEventListener('change', () => {
    const switchId = Number( btn.getAttribute('data-switchId'));
    updateReadStatus(switchId, btn.checked);
    })
  });
}

// Dialog that contains the form.
const dialogAddBookForm = document.querySelector('.add-book-form-dialog');
// Button that is used to display the form.
const displayAddBookForm = document.querySelector('.add-book-btn');
displayAddBookForm.addEventListener('click', () => {
  dialogAddBookForm.showModal();
});
// Button that closes addBook form.
const dialogAddBookFormCloseBtn = document.querySelector('.add-book-form-dialog-close-btn');
dialogAddBookFormCloseBtn.addEventListener('click', ()=> {
  dialogAddBookForm.close();
})

// Calling the initial functions.
displayBooks();
console.log(myLibrary);

// Deleting books.
function deleteBook(id) {
  myLibrary.splice(id, 1);

  // Updating the books displayed.
  displayBooks();
}

// Updating the read status.
function updateReadStatus(id, isChecked) {
  if (isChecked) {
    myLibrary[id].read = 'Read';
  } else {
    myLibrary[id].read = 'Not yet read';
  }

  console.log(myLibrary);
}