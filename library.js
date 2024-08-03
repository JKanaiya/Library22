let Books = [
  {
    title: "Midnight Tides",
    author: "Steven Erikson",
    pageNo: 1217,
    read: true,
  },
  {
    title: "Words of Radiance",
    author: "Brandon Sanderson",
    pageNo: 1088,
    read: true,
  },
  {
    title: "A Memory of Light",
    author: "Robert Jordan, Brandon Sanderson",
    pageNo: 909,
    read: true,
  },
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    pageNo: 1258,
    read: true,
  },
];
const shelf = document.getElementById("shelf");
const add = document.getElementById("add");
// book object constructor
function Book(title, author, pageNo, read) {
  this.title = title;
  this.author = author;
  this.pageNo = pageNo;
  this.read = read;
}
function display() {
  const existingBooks = shelf.querySelectorAll(".bookDiv");
  existingBooks.forEach((book) => book.remove());
  Books.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("bookDiv");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pageNo = document.createElement("p");
    let read = document.createElement("div");
    let readButton = document.createElement("div");
    let readContent = document.createElement("p");
    read.appendChild(readButton);
    read.classList.add("parts");
    read.appendChild(readContent);
    readButton.classList.add("spare");
    readButton.addEventListener("click", () => {
      if (book.read == true) {
        book.read = false;
        display();
      } else {
        book.read = true;
        display();
      }
    });
    // switch between read = false and read = true to allow user to switch between read and not read, button will need to call display with the new objects
    let remove = document.createElement("button");
    remove.addEventListener("click", () => {
      bookDiv.remove();
    });
    if (book.read == false) {
      readContent.style.color = "#d6dd22";
      readButton.style.backgroundColor = "#fff";
    } else {
      readContent.style.color = "blue";
      readButton.style.backgroundColor = "#3a405a";
    }
    title.textContent = book.title;
    author.textContent = book.author;
    pageNo.textContent = `${book.pageNo} pages`;
    readContent.textContent = "Read";
    remove.textContent = "Remove";
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pageNo);
    bookDiv.appendChild(read);
    bookDiv.appendChild(remove);
    shelf.insertBefore(bookDiv, add);
  });
}
function createBookForm() {
  const form = document.createElement("form");

  const fields = [
    { type: "text", id: "title", placeholder: "Title", name: "title" },
    { type: "text", id: "author", placeholder: "Author", name: "author" },
    {
      type: "number",
      id: "pageNo",
      placeholder: "Number of Pages",
      name: "pageNo",
    },
    { type: "checkbox", id: "read", placeholder: "read" },
  ];

  fields.forEach((field) => {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", field.id);

    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;
    input.name = field.name;
    input.placeholder = field.placeholder;

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  });

  const buttonDiv = document.createElement("div");
  const button = document.createElement("button");
  // push info from the form to Display
  button.addEventListener("click", () => {
    let form = document.querySelector("form");
    const title = form.elements["title"].value;
    console.log(title);
    let author = form.elements["author"].value;
    let pageNo = form.elements["pageNo"].value;
    let checkBox = form.elements["read"];
    checkBox.textContent = "Read";
    console.log(checkBox.checked);
    let book = new Book(title, author, pageNo, checkBox.checked);
    Books.push(book);
    button.parentNode.parentNode.remove();
    display();
  });
  button.type = "button";
  button.textContent = "Add";
  buttonDiv.appendChild(button);
  form.appendChild(buttonDiv);
  shelf.insertBefore(form, add);
}
let addCircle = document.getElementById("addCircle");
addCircle.addEventListener("click", () => createBookForm());
window.onload = (event) => display();
