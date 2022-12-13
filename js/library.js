function Library() {
    myLibrary = [];
}

Library.prototype.add = function(book) {
    myLibrary.push(book);
}

Library.prototype.remove = function(book) {
    myLibrary.remove(book);
}

Library.prototype.update = function() {
    let bookContainer = document.getElementsByClassName("book-container")[0];
    
    bookContainer.innerHTML = "";
    
    myLibrary.forEach(book => {
        let card = document.createElement("div");
        
        card.classList.add("book-card");
        
        let title = document.createElement("p");
        let by = document.createElement("span");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let read = document.createElement("button");
        
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
        
        bookContainer.appendChild(card);
    });
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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const btnAdd = document.getElementById("btn-add");
const btnSubmit = document.getElementById("book-entry-submit");

btnAdd.addEventListener("click", () => {
    let entry = document.getElementById("book-entry");
    entry.style.visibility = "visible";
});

btnSubmit.addEventListener("click", (e) => {
    let entry = document.getElementById("book-entry");
    entry.style.visibility = "hidden";
    
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("book-author").value;
    let pages = document.getElementById("book-pages").value;
    let read = document.getElementById("book-read").checked;
    
    library.add(new Book(title, author, pages, read));
    library.update();
    
    e.preventDefault();
});

let library = new Library();

let testBook = new Book("How to Test", "John Smith", 1337, false);
for (let i = 0; i < 7; ++i) library.add(testBook);

library.update();