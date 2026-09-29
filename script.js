/**
 * Supabase Database config.
 */
const SUPABASE_URL = 'https://wcjeipjadcfipstzrcxe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6HvVPaFnSuEk27xCj8NlcQ_UFbq0vYD';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PHOTOS_TABLE = 'photos';
const POSTS_TABLE = 'posts';
const COMMENTS_TABLE = 'comments';

/**
 * In-memory login only. There's no backend auth involved: the credentials
 * below live in this file, so anyone can read them via view-source or the
 * network tab. This only toggles which form the UI shows -- it grants no
 * real access, which is why the write policies in supabase/policy.sql
 * allow the anon key to insert directly regardless of this flag.
 */
const VALID_USERNAME = 'rbhs';
const VALID_PASSWORD = 'password';
let loggedIn = false;

function setUploadFormVisible(show) {
  document.querySelector('#login-form').style.display = show ? 'none' : '';
  document.querySelector('#logout-button').style.display = show ? '' : 'none';
  document.querySelector('#comment-form').style.display = show ? '' : 'none';
}

document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#login-username').value;
  const password = document.querySelector('#login-password').value;
  const status = document.querySelector('#login-status');
  const debug = document.querySelector('#login-debug');

  const matched = username === VALID_USERNAME && password === VALID_PASSWORD;

  debug.textContent =
    `Entered username: ${username}\n` +
    `Entered password: ${password}\n` +
    `Result: ${matched ? 'MATCH' : 'no match'}`;

  if (!matched) {
    status.textContent = 'Invalid username or password.';
    return;
  }

  loggedIn = true;
  status.textContent = '';
  event.target.reset();
  setUploadFormVisible(true);
});

document.querySelector('#logout-button').addEventListener('click', () => {
  loggedIn = false;
  setUploadFormVisible(false);
});

/**
 * UNSAFE button handler.
 * Setting innerHTML injects code directly to be executed by the browser.
 * Can be exploited for reflected XSS attacks.
 */
document.querySelector('#unsafe-button').addEventListener('click', () => {
  unsafeOutput.innerHTML = xssInput.value;
});

/**
 * SAFE button handler.
 * Treats the input as plain text and NOT html code to be executed.
 * Safe from reflected XSS attacks.
 */
document.querySelector('#safe-button').addEventListener('click', () => {
  safeOutput.textContent = xssInput.value;
});




// ================ No need to change anything below this line ================

const xssInput = document.querySelector('#xss-input');
const unsafeOutput = document.querySelector('#unsafe-output');
const safeOutput = document.querySelector('#safe-output');

let photosLoaded = false;
let postsLoaded = false;
let commentsLoaded = false;

function removePhotos() {
  document.querySelector('#photo-list').replaceChildren();
  document.querySelector('#photo-toggle').textContent = 'Load photos…';
  document.getElementById('photo-fetch-status').textContent = '';
  photosLoaded = false;
}

function removePosts() {
  document.querySelector('#post-list').replaceChildren();
  document.querySelector('#post-toggle').textContent = 'Load posts…';
  document.getElementById('post-fetch-status').textContent = '';
  postsLoaded = false;
}

function removeComments() {
  document.querySelector('#comment-list').replaceChildren();
  document.querySelector('#comment-toggle').textContent = 'Load comments…';
  document.getElementById('comment-fetch-status').textContent = '';
  commentsLoaded = false;
}

document.querySelector('#photo-toggle').addEventListener('click', () => {
  photosLoaded ? removePhotos() : loadPhotos();
});

document.querySelector('#post-toggle').addEventListener('click', () => {
  postsLoaded ? removePosts() : loadPosts();
});

document.querySelector('#comment-toggle').addEventListener('click', () => {
  commentsLoaded ? removeComments() : loadComments();
});

document.addEventListener('DOMContentLoaded', () => {
  // loadPhotos();
  // loadPosts();
  // loadComments();
});

function showError(element, message) {
  const p = document.createElement('p');
  p.className = 'error';
  p.textContent = message;
  element.replaceChildren(p);
}

async function loadPhotos() {
  const container = document.querySelector('#photo-list');
  try {
    const { data: photos, error } = await supabaseClient
      .from(PHOTOS_TABLE)
      .select('id, title, thumbnail_url')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      throw new Error(`Photos could not be loaded: ${error.message}`);
    }

    const fetchEl = document.getElementById('photo-fetch-status');
    fetchEl.className = 'fetched';
    fetchEl.textContent = `fetched images: HTTP /GET "${SUPABASE_URL}/rest/v1/photos"`;

    container.replaceChildren(...photos.map(photo => {
      const article = document.createElement('article');
      article.className = 'photo-card';

      const img = document.createElement('img');
      img.src = photo.thumbnail_url;
      img.alt = photo.title;

      const title = document.createElement('h3');
      title.textContent = photo.title;

      const idParagraph = document.createElement('p');
      idParagraph.textContent = `Photo ID: ${photo.id}`;

      article.append(img, title, idParagraph);
      return article;
    }));

    document.querySelector('#photo-toggle').textContent = 'Remove photos';
    photosLoaded = true;

  } catch (error) {
    showError(container, error.message);
  }
}

async function loadPosts() {
  const container = document.querySelector('#post-list');
  try {
    const { data: posts, error } = await supabaseClient
      .from(POSTS_TABLE)
      .select('id, title, body')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      throw new Error(`Posts could not be loaded: ${error.message}`);
    }

    const fetchEl = document.getElementById('post-fetch-status');
    fetchEl.className = 'fetched';
    fetchEl.textContent = `HTTP /GET "${SUPABASE_URL}/rest/v1/posts"`;

    container.replaceChildren(...posts.map(post => {
      const article = document.createElement('article');
      article.className = 'post-card';

      const title = document.createElement('h3');
      title.textContent = post.title;

      const body = document.createElement('p');
      body.textContent = post.body;

      article.append(title, body);
      return article;
    }));

    document.querySelector('#post-toggle').textContent = 'Remove posts';
    postsLoaded = true;
  } catch (error) {
    showError(container, error.message);
  }
}

async function loadComments() {
  const container = document.querySelector('#comment-list');
  try {
    const { data: comments, error } = await supabaseClient
      .from(COMMENTS_TABLE)
      .select('id, name, email, body')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Comments could not be loaded: ${error.message}`);
    }

    const fetchEl = document.getElementById('comment-fetch-status');
    fetchEl.className = 'fetched';
    fetchEl.textContent = `HTTP /GET "${SUPABASE_URL}/rest/v1/comments"`;

    container.replaceChildren(...comments.map(comment => {
      const article = document.createElement('article');
      article.className = 'comment-card';

      const header = document.createElement('strong');
      header.textContent = `${comment.name} · ${comment.email}`;

      const body = document.createElement('p');
      body.textContent = comment.body;

      article.append(header, body);
      return article;
    }));

    document.querySelector('#comment-toggle').textContent = 'Remove comments';
    commentsLoaded = true;

  } catch (error) {
    showError(container, error.message);
  }
}

document.querySelector('#comment-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#comment-name-input');
  const emailInput = document.querySelector('#comment-email-input');
  const bodyInput = document.querySelector('#comment-body-input');
  const status = document.querySelector('#comment-status');

  status.textContent = `Issuing /POST request to "${SUPABASE_URL}/rest/v1/comments"`;
  status.className = 'fetched';

  try {
    const { error } = await supabaseClient
      .from(COMMENTS_TABLE)
      .insert({
        name: nameInput.value,
        email: emailInput.value,
        body: bodyInput.value,
      });

    if (error) throw error;

    status.textContent = `/POST request to "${SUPABASE_URL}/rest/v1/comments"`;
    event.target.reset();
    loadComments();

  } catch (error) {
    status.textContent = `Comment could not be posted: ${error.message}`;
  }
});
