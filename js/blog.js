function showFilterMenu() {
  let filterMenu = document.getElementsByClassName("tagFilters")[0];
  filterMenu.classList.toggle("enabled");
}

function filterPosts(tag) {
  const posts = document.querySelectorAll('.postList li');
  let count = 0;

  posts.forEach(post => {
    const postTags = post.getAttribute('data-tags');
    if (tag === 'All Posts') {
      post.style.display = 'block';
      count++;
    } else if (postTags) {
      const tagsArray = postTags.split(',');
      if (tagsArray.includes(tag)) {
        post.style.display = 'block';
        count++;
      } else {
        post.style.display = 'none';
      }
    } else {
      post.style.display = 'none';
    }
  });

  document.getElementById('results').innerText = `${count} Results`;
}