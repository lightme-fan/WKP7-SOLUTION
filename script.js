let books = [
    // { 
    //     title: 'Little woman',
    //     author: 'Louisa',
    //     genre: 'Romantic',
    //     pages: 759,
    //     read: true,
    //     id: 1597757636334,
    // },
    // {
    //     title: 'Harry Potter',
    //     author: 'J.k Rowling',
    //     genre: 'Fantasy fiction',
    //     pages: 978,
    //     read: false,
    //     id: 1597757596873,
    // },
    // {
    //     title: 'Educated',
    //     author: 'Tara Westover',
    //     genre: 'Biography',
    //     pages: 352,
    //     read: false,
    //     id: 1597757617938,
    // }
];

// add an element to the list with the form
// The element is added on the list
// reset the form after submission
// Not add an empty element
// delete an element
// edit the state of an element
// save new element to local storage
// save the new state of object in local storage
// form validation?
const tableLIst = document.querySelector('tbody');
const form = document.querySelector('form');

const showBooks = () => {
    const html = books.map(book => {
        return `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.pages}</td>
                <td>
                    <button value="${book.id}" class="check" aria-label=" Updated read attribute ${book.title}">
                        <img ${book.read ? '' : 'hidden'} 
                            src="assets/icons/checked.svg" 
                            alt="The book ${book.title} is read">
                        <img ${book.read ? 'hidden' : ''} 
                            src="assets/icons/unchecked.svg" 
                            alt="The book ${book.title} is not read">
                    </button>        
                </td>
                <td>
                    <button value="${book.id}" class="delete" aria-label="Delete book ${book.title}">
                        <img src="./assets/icons/trash.svg" alt="Delete ${book.title} from the list">
                    </button>    
                </td>
            </tr>
        `;
    }).join('');
    tableLIst.innerHTML = html;
};

// Add a new book
const addBook = e => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const newBook = {
        title: formEl.title.value,
        author: formEl.author.value,
        genre: formEl.genre.value,
        pages: formEl.pages.value,
        read: formEl.read.value === 'true', // true or false
        id: Date.now()
    }
    console.log(author);
    console.log(newBook);
    books.push(newBook);
    tableLIst.dispatchEvent(new CustomEvent('listUpdated'));
    formEl.reset();
};

// Handle click
const handleClick = e => {
    const checkBtn = e.target.closest('button.check');
    if (checkBtn) {
        const id = Number(checkBtn.value);
        updateRead(id);
    }

    const deleteBtn = e.target.closest('button.delete');
    if (deleteBtn) {
        const id = Number(deleteBtn.value);
        deleteBook(id);
    }
};

const deleteBook = id => {
    books = books.filter(book => book.id !== id);
    tableLIst.dispatchEvent(new CustomEvent('listUpdated'));
};

const updateRead = id => {
    // console.log('Updated', id)
    const bookToUpdate = books.find(book => book.id === id);
    bookToUpdate.read = !bookToUpdate.read;
    tableLIst.dispatchEvent(new CustomEvent('listUpdated'));
};

const initLocalStorage = () => {
    const bookLs = JSON.parse(localStorage.getItem('books'));
    if (!bookLs) {
        books = []; 
        console.log('Books', books)
    }

    else {
        books = bookLs;
        console.log('Book Ls', bookLs);
    }
    tableLIst.dispatchEvent(new CustomEvent('listUpdated'));
};

const updateLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
};

// Listen for submit event
form.addEventListener('submit', addBook);

// Listener for the table list
tableLIst.addEventListener('listUpdated', showBooks);
window.addEventListener('DOMContentLoaded', showBooks);
tableLIst.addEventListener('listUpdated', updateLocalStorage);
tableLIst.addEventListener('click', handleClick);

initLocalStorage();