class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    myLibrary = [];
    
    add = (book) => {
        this.myLibrary.push(book);
    }
    
    remove = (index) => {
        if (index < 0) return;
        this.myLibrary.splice(index, 1);
    }
    
    update = () => {
        const bookContainer = document.getElementsByClassName("book-container")[0];
    
        bookContainer.innerHTML = "";
        
        this.myLibrary.forEach((book, index) => {
            const card = document.createElement("div");
            
            card.classList.add("book-card");
            
            const title = document.createElement("p");
            const by = document.createElement("span");
            const author = document.createElement("p");
            const pages = document.createElement("p");
            const read = document.createElement("button");
            const removeBook = document.createElement("button");
            const removeImg = document.createElement("img");
            
            removeBook.appendChild(removeImg);
            removeBook.classList.add("book-remove");
            removeImg.src = "img/icon-book-remove.png";
            removeBook.dataset.index = index;
            
            removeBook.addEventListener("click", (e) => {
                this.remove(e.currentTarget.dataset.index);
                this.update();
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
}

let library = new Library();
library.update();

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