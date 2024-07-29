document.addEventListener('DOMContentLoaded', function() {
 //mobile menu
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');
    const body = document.querySelector('body');

    const mobileMenu = () => {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        body.classList.toggle('active');
    };

    menu.addEventListener('click', mobileMenu);

    // book list
    const bookList = document.getElementById('book-list');
    const books = [
        { title: "Good Girl's Guide to Murder", author: 'Holly Jackson', cover: 'books/guide1.jpg' },
        { title: 'The Hobbit', author: 'J. R. R. Tolkien', cover: 'books/hobbit.jpg' },
        { title: "Harry Potter and the Sorcerer's Stone", author: 'JK Rowling', cover: 'books/hpbooks.jpg' },
        { title: 'We Hunt the Flame', author: 'Hafsah Faizal', cover: 'books/hung.jpg' },
        { title: 'Divine Rivals', author: 'Rebecca Ross', cover: 'books/divinerivals.jpg' },
        { title: 'Yellowface', author: 'RF Kuag', cover: 'books/yellowface.jpg' }
    ];

    books.forEach(function(book) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');
        bookItem.innerHTML = `
            <img src="${book.cover}" alt="${book.title} cover" class="book-cover">
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">by ${book.author}</p>
        `;
        bookList.appendChild(bookItem);
    });

    // countdown
        const targetDate = new Date('2024-09-01T00:00:00').getTime(); 
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let countdownHTML = `
            <div class="countdown-item">
                <div>${days}</div>
                <span>Days</span>
            </div>
            <div class="countdown-item">
                <div>${hours}</div>
                <span>Hours</span>
            </div>
            <div class="countdown-item">
                <div>${minutes}</div>
                <span>Minutes</span>
            </div>
            <div class="countdown-item">
                <div>${seconds}</div>
                <span>Seconds</span>
            </div>
        `;

        document.getElementById('countdown').innerHTML = countdownHTML;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = 'EXPIRED';
        }
    }, 1000);

  // quote
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        
     
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        
        if (data.content && data.author) {
            document.getElementById('quote').innerHTML = data.content;
            document.getElementById('book').innerHTML = data.tags ? data.tags.join(', ') : 'N/A';
            document.getElementById('author').innerHTML = `- ${data.author}`;
    
        } else {
            throw new Error('Invalid data structure');
        }
        
    } catch (error) {
        console.error('Error fetching the quote:', error);
        document.getElementById('quote').innerHTML = 'Could not fetch quote. Please try again later.';
    }
}

fetchQuote();
});


