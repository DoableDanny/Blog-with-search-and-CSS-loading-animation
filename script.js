const filter = document.getElementById('filter');
const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');

let limit = 3;
let page = 1;

// Get posts from API
async function getPosts() {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  let data = await res.json();
  return data;
}

// Render the posts to the DOM
async function showPosts() {
  let posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="post-number" id="post-number">${post.id}</div>
    <div class="post-info">
      <h3 class="post-title">${post.title}</h3>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

showPosts();

function showLoading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  console.log(term);

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    console.log(title);
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else post.style.display = 'none';
  });
}

window.addEventListener('scroll', () => {
  // element.scrollTop - is the pixels hidden in top due to the scroll. With no scroll its value is 0.
  // element.scrollHeight - is the pixels of the whole div.
  // element.clientHeight - is the pixels that you see in your browser.
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // When we scroll to end of page, show the loader
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
