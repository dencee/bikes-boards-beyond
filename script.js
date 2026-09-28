const API = 'https://jsonplaceholder.typicode.com';

const xssInput = document.querySelector('#xss-input');
const unsafeOutput = document.querySelector('#unsafe-output');
const safeOutput = document.querySelector('#safe-output');

document.querySelector('#unsafe-button').addEventListener('click', () => {
  // Intentionally unsafe for demonstration purposes.
  unsafeOutput.innerHTML = xssInput.value;
});

document.querySelector('#safe-button').addEventListener('click', () => {
  // Safe: treats the input as plain text.
  safeOutput.textContent = xssInput.value;
});

function showError(element, message) {
  element.innerHTML = `<p class="error">${message}</p>`;
}

async function loadPhotos() {
  const container = document.querySelector('#photo-list');
  try {
    const response = await fetch(`${API}/photos?_limit=6`);
    if (!response.ok) throw new Error('Photos could not be loaded.');
    const photos = await response.json();
    container.innerHTML = photos.map(photo => `
      <article class="photo-card">
        <img src="${photo.thumbnailUrl}" alt="${photo.title}">
        <h3>${photo.title}</h3>
        <p>Photo ID: ${photo.id}</p>
      </article>`).join('');
  } catch (error) { showError(container, error.message); }
}

async function loadPosts() {
  const container = document.querySelector('#post-list');
  try {
    const response = await fetch(`${API}/posts?_limit=6`);
    if (!response.ok) throw new Error('Posts could not be loaded.');
    const posts = await response.json();
    container.innerHTML = posts.map(post => `
      <article class="post-card">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </article>`).join('');
  } catch (error) { showError(container, error.message); }
}

async function loadComments() {
  const container = document.querySelector('#comment-list');
  try {
    const response = await fetch(`${API}/comments?_limit=6`);
    if (!response.ok) throw new Error('Comments could not be loaded.');
    const comments = await response.json();
    container.innerHTML = comments.map(comment => `
      <article class="comment-card">
        <strong>${comment.name} · ${comment.email}</strong>
        <p>${comment.body}</p>
      </article>`).join('');
  } catch (error) { showError(container, error.message); }
}

loadPhotos();
loadPosts();
loadComments();
