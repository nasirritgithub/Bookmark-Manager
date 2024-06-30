document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
    e.preventDefault();

    const name = document.getElementById('bookmarkName').value;
    const url = document.getElementById('bookmarkUrl').value;

    if (!validateForm(name, url)) {
        return;
    }

    const bookmark = {
        name,
        url
    };

    let bookmarks = [];
    if (localStorage.getItem('bookmarks') !== null) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('bookmarkForm').reset();
    fetchBookmarks();
}

function fetchBookmarks() {
    let bookmarks = [];
    if (localStorage.getItem('bookmarks') !== null) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }

    const bookmarksList = document.getElementById('bookmarks');
    bookmarksList.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', bookmark.url);
        link.setAttribute('target', '_blank');
        link.textContent = bookmark.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteBookmark(bookmark.url);
        });

        li.appendChild(link);
        li.appendChild(deleteButton);
        bookmarksList.appendChild(li);
    });
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validateForm(name, url) {
    if (!name || !url) {
        alert('Please fill in the form');
        return false;
    }

    const expression = /^(?:(?:https?|ftp):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}(?:\/|\/([\w#!:.?+=&%@!\-/]))?$/;
    const regex = new RegExp(expression);

    if (!url.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', fetchBookmarks);
