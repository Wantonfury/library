/*function Library() {
    myLibrary = [];
}

Library.prototype.add = function(book) {
    myLibrary.push(book);
}

Library.prototype.remove = function(index) {
    if (index < 0) return;
    myLibrary.splice(index, 1);
}

Library.prototype.update = function() {
    let bookContainer = document.getElementsByClassName("book-container")[0];
    
    bookContainer.innerHTML = "";
    
    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        
        card.classList.add("book-card");
        
        let title = document.createElement("p");
        let by = document.createElement("span");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let read = document.createElement("button");
        let removeBook = document.createElement("button");
        let removeImg = document.createElement("img");
        
        removeBook.appendChild(removeImg);
        removeBook.classList.add("book-remove");
        removeImg.src = "img/icon-book-remove.png";
        removeBook.dataset.index = index;
        
        removeBook.addEventListener("click", (e) => {
            library.remove(e.currentTarget.dataset.index);
            library.update();
        });
        
        title.textContent = book.title;
        by.textContent = "by";
        author.textContent = book.author;
        pages.textContent = book.pages + " pages";
        
        read.textContent = (book.read === true ? "Read" : "Not read");
        read.dataset.read = book.read;
        read.addEventListener('click', readToggle);
        if (book.read === false) read.style.backgroundColor = "red";
        else read.style.backgroundColor = "green";
        
        card.appendChild(title);
        card.appendChild(by);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeBook);
        
        bookContainer.appendChild(card);
    });
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}*/

class Book {
    constructor(title, name, author, pages, read) {
        this.title = title;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    #myLibrary = [];
    
    add = () => {
        
    }
    
    remove = () => {
        
    }
    
    #update = () => {
        
    }
}

let readToggle = function(e) {
    if (e.currentTarget.getAttribute("data-read") === "true") {
        e.currentTarget.setAttribute("data-read", "false");
        e.currentTarget.textContent = "Not read";
        e.currentTarget.style.backgroundColor = "red";
    }
    else {
        e.currentTarget.setAttribute("data-read", "true");
        e.currentTarget.textContent = "Read";
        e.currentTarget.style.backgroundColor = "green";
    }
}

const btnAdd = document.getElementById("btn-add");
const btnSubmit = document.getElementById("book-entry-form");
const formOverlay = document.querySelector("#book-entry");

function ResetForm() {
    let textFields = document.querySelectorAll("input[type=text], input[type=number]");
    [...textFields].forEach(field => {
        field.value = "";
    });
    
    let readCheckbox = document.querySelector("input[type=checkbox]");
    readCheckbox.checked = false;
}

btnAdd.addEventListener("click", () => {
    let entry = document.getElementById("book-entry");
    entry.style.visibility = "visible";
});

btnSubmit.addEventListener("submit", (e) => {
    let entry = document.getElementById("book-entry");
    entry.style.visibility = "hidden";
    
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("book-author").value;
    let pages = document.getElementById("book-pages").value;
    let read = document.getElementById("book-read").checked;
    
    library.add(new Book(title, author, pages, read));
    library.update();
    
    ResetForm();
    
    e.preventDefault();
});

formOverlay.addEventListener("click", (e) => {
    let form = document.querySelector("#book-entry-form");
    if (e.target !== e.currentTarget) return;
    
    e.currentTarget.style.visibility = "hidden";
    ResetForm();
});

let library = new Library();
library.update();