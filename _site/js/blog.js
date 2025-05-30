const POSTS_PER_PAGE = 10;

let all_posts = [];
let available_posts = [];
let loaded_pages = 1;

// Initializes the posts and tag filters
async function initializePosts() {
  // Collect all posts from posts.json
  const post_result = await fetch(baseurl + '/Resources/posts.json');
  all_posts = await post_result.json();
  available_posts = all_posts.slice();

  // Initialize the posts and tag filter menu
  renderPosts(available_posts);
  populateTagFilter(all_posts);
}

// Initializes the tag filters based on the tags found in posts
function populateTagFilter(posts) {
  const tags = new Set();

  // Collect all possible tags
  for (post of posts) {
    for (tag of post.tags) {
      tags.add(tag);
    }
  }

  // Sort tags alphabetically
  tagsList = Array.from(tags);
  tagsList.sort();

  // Add each tag as an option in the filter menu
  const tag_filter = document.querySelector('#tagFilters #tags');
  for (tag of tagsList) {
    const label = document.createElement('label');
    const input = document.createElement('input')
    input.type = "checkbox";
    input.value = tag;
    label.appendChild(input);
    label.appendChild(document.createTextNode(tag));
    tag_filter.appendChild(label);
  }
}

// Renders the posts in the DOM
function renderPosts(posts) {
  const post_container = document.getElementById('postContainer');
  const post_template = document.getElementById('post-template');

  const currently_loaded_posts = document.getElementsByClassName('post').length;

  posts_to_render = posts.slice(currently_loaded_posts, Math.min(posts.length, loaded_pages * POSTS_PER_PAGE));

  // Render all required posts
  posts_to_render.forEach(post => {
    const template_clone = post_template.content.cloneNode(true);

    // Image
    if (post['image']) {
      const post_image = template_clone.querySelector('.post-image');
      post_image.style.backgroundImage = "url(" + post.image + ")";
    }

    // Title
    const post_title = template_clone.querySelector('.post-title a');
    post_title.textContent = post.title;
    post_title.href = post.url;

    // Subtitle
    if (post['subtitle']) {
      const post_subtitle = template_clone.querySelector('.post-subtitle');
      post_subtitle.textContent = post.subtitle;
    }

    // Date
    const post_date = template_clone.querySelector('.post-date');
    post_date.textContent = post.date;

    // Tags
    const post_tags = template_clone.querySelector('.post-tags');
    for (tag of post.tags) {
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const strong = document.createElement('strong');

      strong.textContent = `#${tag}`;
      h3.appendChild(strong);
      li.appendChild(h3);

      post_tags.appendChild(li);
    }

    // Excerpt
    const post_excerpt = template_clone.querySelector('.post-excerpt');
    post_excerpt.textContent = post.excerpt;

    post_container.appendChild(template_clone);
  });

  // Update result count
  const result = document.getElementById('resultsCount');
  result.textContent = posts.length;
  const new_post_count = document.getElementsByClassName('post').length;

  // Disable pagination button if no more posts can be loaded
  const paginationButtonContainer = document.getElementById('paginationContainer');
  if (new_post_count >= available_posts.length) {
    paginationButtonContainer.style.display = "none";
  } else {
    paginationButtonContainer.style.display = "flex";
  }
}

// Updates the available posts based on the tags and search parameters
function updatePosts() {
  const search_value = document.getElementById('tagSearch').value.toLowerCase();
  const selected_tags = getSelectedTags();

  const filtered = all_posts.filter(post => {
    const matchesContent = (
      post.title.toLowerCase().includes(search_value) ||
      post.subtitle.toLowerCase().includes(search_value) ||
      post.excerpt.toLowerCase().includes(search_value)
    );

    const matchesTag = (
      !selected_tags ||
      selected_tags.every(item => post.tags.includes(item))
    );

    return matchesContent && matchesTag;
  });

  available_posts = filtered.slice();
  clearPostFeed();
  renderPosts(available_posts);
}

// Returns an array containing the tag filters currently selected in plain text
function getSelectedTags() {
  return Array.from(document.querySelectorAll('#tagFilters #tags input[type="checkbox"]:checked')).map(input => input.value);
}

// Renders one page more worth of posts
function loadMorePosts() {
  loaded_pages += 1;
  renderPosts(available_posts);
}

// Resets the current page, as well as clears the current posts
function clearPostFeed() {
  loaded_pages = 1;
  document.getElementById('postContainer').innerHTML = '';
}

// Unchecks all tag filters from the tag filters menu
function clearTagFilters() {
  const tag_filters = document.querySelectorAll('#tagFilters #tags input[type="checkbox"]:checked');
  tag_filters.forEach(item => {
    item.checked = false;
  });
  updatePosts();
}

function slideToggle(element, duration = 300) {
  element.style.transition = `max-height ${duration}ms ease-in-out`;
  element.style.overflow = 'hidden';
  if (window.getComputedStyle(element).maxHeight !== '0px') {
    element.style.maxHeight = "0";
  } else {
    element.style.maxHeight = element.scrollHeight + 'px';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializePosts();
  document.getElementById('tagFilters').addEventListener('change', updatePosts);
  document.getElementById('tagSearch').addEventListener('input', updatePosts);
  document.getElementById('tagFiltersToggle').addEventListener('click', () => {
    slideToggle(document.getElementById('expandableContent'));
  });
});