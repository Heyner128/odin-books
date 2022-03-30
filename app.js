let myLibrary = []

function book(name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = myLibrary.length;
    this.readStatus = false;
}

book.prototype.toggleReadStatus = function () {
    this.readStatus = !this.readStatus;
    showBooks();
}

function addBookToLibrary(name, author, year) {
    const bookToAdd = new book(name, author, year);
    myLibrary.push(bookToAdd);
    showBooks();
}

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
    showBooks();
}

function htmlBookCard(bookInCard) {
    //main card DOM element
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    //name card text
    const nameElement = document.createElement('p');
    nameElement.innerText = bookInCard.name;
    nameElement.className = 'cardName';
    
    //author card text
    const authorElement = document.createElement('p');
    authorElement.innerText = bookInCard.author;
    authorElement.className = 'cardAuthor';
    
    //year card text
    const yearElement = document.createElement('p');
    yearElement.innerText = bookInCard.year;
    yearElement.className = 'cardYear';

    //read status text
    const readElement = document.createElement('p');
    readElement.innerText = bookInCard.readStatus?'Read':'Not read';
    readElement.className = 'cardYear';

    
    //remove button
    const removeBtnElement = document.createElement('button');
    removeBtnElement.innerText = 'Remove Book';
    removeBtnElement.className = 'cardButton'
    removeBtnElement.addEventListener('click',event=>removeBookFromLibrary(bookInCard.id));

    //mark as read button
    const readedBtnElement = document.createElement('button');
    readedBtnElement.innerText = 'Mark As Read';
    readedBtnElement.className = 'cardButton'
    readedBtnElement.addEventListener('click',event=>bookInCard.toggleReadStatus());

    const btnsContainer = document.createElement('div');
    btnsContainer.appendChild(removeBtnElement);
    btnsContainer.appendChild(readedBtnElement);

    cardElement.appendChild(nameElement);
    cardElement.appendChild(authorElement);
    cardElement.appendChild(yearElement);
    cardElement.appendChild(readElement);
    cardElement.appendChild(btnsContainer);

    return cardElement;
}


function addYears(min) {
    const data= document.querySelector('#years');
    const today= new Date();
    const max = today.getFullYear();
    for(let i=max;i>=min;i--) {
        const option = document.createElement('option');
        option.value = i;
        data.appendChild(option);
    }
} 

function showBooks() {
    const container = document.querySelector('#cards-container');

    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    
    myLibrary.forEach(
        bk=>container.appendChild(htmlBookCard(bk))
    );
}

function addNewBookButtonHandler(event) {
    document.querySelector('#new-form-container').style.visibility='visible';
    nameInput.value= '';
    authorInput.value= '';
    yearInput.value= '';
}

function addBtnHandler(event) {
    if(Number(yearInput.value)) {
        addBookToLibrary(nameInput.value, authorInput.value, yearInput.value);
        document.querySelector('#new-form-container').style.visibility='hidden';
    };
    
}

function closeBtnHandler(event) {
    document.querySelector('#new-form-container').style.visibility='hidden';
}

const nameInput = document.querySelector('#form-name-textbox');
const authorInput = document.querySelector('#form-author-textbox');
const yearInput = document.querySelector('#form-year-textbox');
const addButton = document.querySelector('#add-new-btn');
const closeButton = document.querySelector('#close-btn');
const addNewBookButton = document.querySelector('#new-book');
addNewBookButton.addEventListener('click', addNewBookButtonHandler);
addButton.addEventListener('click',addBtnHandler);
closeButton.addEventListener('click', closeBtnHandler);
addYears(1920)





