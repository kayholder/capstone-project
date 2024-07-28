<script>
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');
    const body = document.querySelector('body');

    const mobileMenu = () => {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        body.classList.toggle('active');
    };

    menu.addEventListener('click', mobileMenu);

    // Prevent form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    // Populate book list
    const bookList = document.getElementById('book-list');
    const books = [
        { title: 'The Silent Patient', author: 'Alex Michaelides', cover: 'books/book1.jpg' },
        { title: 'Where the Crawdads Sing', author: 'Delia Owens', cover: 'books/book2.jpg' },
        { title: 'The Testaments', author: 'Margaret Atwood', cover: 'books/book3.jpg' },
        { title: 'Normal People', author: 'Sally Rooney', cover: 'books/book4.jpg' },
        { title: 'Educated', author: 'Tara Westover', cover: 'books/book5.jpg' },
        { title: 'Circe', author: 'Madeline Miller', cover: 'books/book6.jpg' }
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

    // Countdown to next book
    const targetDate = new Date('2024-08-01T00:00:00').getTime();
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            <div>${days}d</div>
            <div>${hours}h</div>
            <div>${minutes}m</div>
            <div>${seconds}s</div>
        `;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = 'EXPIRED';
        }
    }, 1000);

    // Fetch random quote from the database
    const quoteContainer = document.getElementById('quote-container');
    const quoteElement = document.getElementById('quote');
    const bookElement = document.getElementById('book');
    const authorElement = document.getElementById('author');
    const lengthElement = document.getElementById('length');
    const wordsElement = document.getElementById('words');
    const createdAtElement = document.getElementById('createdAt');
    const updatedAtElement = document.getElementById('updatedAt');

    fetch('/api/random/quote-from-db')
        .then(response => response.json())
        .then(data => {
            quoteElement.textContent = `"${data.quote}"`;
            bookElement.textContent = `Book: ${data.book}`;
            authorElement.textContent = `Author: ${data.author}`;
            lengthElement.textContent = `Length: ${data.length} characters`;
            wordsElement.textContent = `Words: ${data.words}`;
            createdAtElement.textContent = `First Published: ${new Date(data.createdAt).toLocaleString()}`;
            updatedAtElement.textContent = `Last Updated: ${new Date(data.updatedAt).toLocaleString()}`;
        })
        .catch(error => {
            quoteContainer.textContent = 'Error fetching quote';
            console.error('Error:', error);
        });
});
</script>
