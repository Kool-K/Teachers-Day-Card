document.addEventListener('DOMContentLoaded', () => {
    
    // --- Responsive Scaling Logic ---
    const wrapper = document.querySelector('.wrapper');
    const nativeWidth = 1000;
    const nativeHeight = 600;

    function scaleScene() {
        const scale = Math.min(window.innerWidth / nativeWidth, window.innerHeight / nativeHeight);
        wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    scaleScene();
    window.addEventListener('resize', scaleScene);


    // --- Book Opening Logic ---
    const books = document.querySelectorAll('.book');
    const bookshelf = document.querySelector('.bookshelf');
    let openBook = null;

    function closeOpenBook() {
        if (openBook) {
            openBook.classList.remove('open');
            bookshelf.classList.remove('has-open-book');
            openBook = null;
        }
    }

    books.forEach(book => {
        if (book.classList.contains('spacer-book')) return;

        book.addEventListener('click', (e) => {
            e.stopPropagation();
            if (book.classList.contains('open')) {
                closeOpenBook();
            } else {
                closeOpenBook();
                book.classList.add('open');
                bookshelf.classList.add('has-open-book');
                openBook = book;
            }
        });
    });

    document.querySelector('.scene').addEventListener('click', closeOpenBook);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOpenBook();
        }
    });

    // --- Personal Note Modal Logic ---
    const noteTrigger = document.getElementById('personal-note-trigger');
    const noteOverlay = document.getElementById('personal-note-overlay');
    const closeNoteBtn = document.getElementById('close-note-btn');

    function openNote() {
        noteOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNote() {
        noteOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    noteTrigger.addEventListener('click', openNote);
    closeNoteBtn.addEventListener('click', closeNote);
    noteOverlay.addEventListener('click', (e) => {
        if (e.target === noteOverlay) {
            closeNote();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && noteOverlay.classList.contains('active')) {
            closeNote();
        }
    });

    // --- Subtle Animation for Book Hover ---
    books.forEach(book => {
        if (book.classList.contains('spacer-book')) return;
        
        book.addEventListener('mouseenter', () => {
            if (!book.classList.contains('open')) {
                book.style.transform = 'translateY(-15px) rotateZ(-2deg)';
            }
        });
        
        book.addEventListener('mouseleave', () => {
            if (!book.classList.contains('open')) {
                book.style.transform = '';
            }
        });
    });

    // --- Add subtle animation to the header ---
    const header = document.querySelector('.header-content');
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        header.style.transition = 'opacity 1s ease, transform 1s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 300);
});