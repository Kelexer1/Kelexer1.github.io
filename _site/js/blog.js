let all_posts = []

// Initializes the posts and tag filters
async function initializePosts() {
  const post_result = await fetch(baseurl + '/Resources/posts.json');
  all_posts = await post_result.json();

  renderPosts(all_posts);
  populateTagFilter(all_posts);
}

// Initializes the tag filters based on the tags found in posts
function populateTagFilter(posts) {
  const tags = new Set();

  for (post of posts) {
    for (tag of post.tags) {
      tags.add(tag);
    }
  }

  tagsList = Array.from(tags);
  tagsList.sort();

  const tag_filter = document.getElementById('tagFilters');
  for (tag of tagsList) {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    tag_filter.appendChild(option);
  }
}

// Renders the posts in the DOM
function renderPosts(posts) {
  const post_container = document.getElementById('postContainer');
  const post_template = document.getElementById('post-template');

  post_container.innerHTML = '';

  posts.forEach(post => {
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
    const date = new Date(post.date);
    post_date.textContent = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

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

  const result = document.getElementById('resultsCount');
  result.textContent = posts.length;
}

// Updates the available posts based on the tags and search parameters
// Resets the available parameters if both are empty
function updatePosts() {
  const search_value = document.getElementById('tagSearch').value.toLowerCase();
  const selected_tag = document.getElementById('tagFilters').value;

  const filtered = all_posts.filter(post => {
    const matchesContent = (
      post.title.toLowerCase().includes(search_value) ||
      post.subtitle.toLowerCase().includes(search_value) ||
      post.excerpt.toLowerCase().includes(search_value)
    );
    const matchesTag = !selected_tag || post.tags.includes(selected_tag);
    return matchesContent && matchesTag;
  });

  renderPosts(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  initializePosts();
  document.getElementById('tagFilters').addEventListener('change', updatePosts);
  document.getElementById('tagSearch').addEventListener('input', updatePosts);
});