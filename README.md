# Basic Bikes, Boards, and Beyond

An extremely basic website using only HTML, CSS, and vanilla JavaScript.

Open `index.html` in a browser. For best results, serve the folder with a simple local server such as VS Code Live Server because browsers may restrict `fetch()` when opening a file directly.

The JavaScript makes three API requests:

- `https://jsonplaceholder.typicode.com/photos?_limit=6`
- `https://jsonplaceholder.typicode.com/posts?_limit=6`
- `https://jsonplaceholder.typicode.com/comments?_limit=6`

This demonstrates `fetch`, `async`/`await`, JSON parsing, template literals, DOM updates, and basic error handling.
