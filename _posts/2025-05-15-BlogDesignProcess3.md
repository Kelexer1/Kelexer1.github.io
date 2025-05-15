---
layout: post
categories: blog
image: Resources/KelexerLogo.svg
title: Dynamic blog post filtering using Jekyll
subtitle: How I implemented a dynamic post fetching system for my blog
date: 2025-05-15
tags:
  - blog
  - website
  - tutorial
---
In my last post in this 4 part series, I talked about how I conceptualized, designed, and implemented the UI for my blog page using various techniques and tools. This post, I will shift from the front end design of the blog page, and instead focus more on the backend code that makes the entire page function.

Technically, you don't *need* to use any sort of JavaScript to deploy a functioning blog page. Jekyll has built in tools for blogging that includes pagination, and other forms of organizing your posts (which are also automatically generated). However, I mentioned earlier that I wanted to implement various forms of content filtering so that readers could easily locate specific groups of posts. Additionally, I wanted to include pagination on top of this specification, which rendered Jekyll's default pagination tool useless. I'll document filtering and pagination separately, starting with filtering.

In my blog, I wanted to be able to filter by text (whether the phrase was in the title, or the excerpt) along with tags (useful to find all posts that fit a specific category). Additionally, I wanted my implementation to be easily scalable should I wish to add another filter type in the future (ex. by date range). The solution to both these problems was to develop a central filtering system that could be accessed by a specific filter. This system would take the bulk of the processing off the filter, which would become more of a container that stored its specific date (like the tag that should be filtered by). Using JS, this is a fairly straight forward task. By reading the data on each of the filters, we can use an anonymous function consisting of a compound boolean expression to determine whether a specific post meets the criteria to be displayed to the reader. Then, by iterating over all of the possible posts metadata (a collection of the posts basic information like title etc.), we can quickly get a list of all the posts that meet the criteria to be displayed whenever a filter has its value changed. Below is an annotated copy of the post updating function:

```js
function updatePosts() {
  // Find the search bar and tag menu elements for later use
  const search_value = document.getElementById('tagSearch').value.toLowerCase();
  const selected_tag = document.getElementById('tagFilters').value;

  // Collect all posts based on if the post meets the criteria for being displayed
  const filtered = all_posts.filter(post => {
    // Check if the search data is found in the title, subtitle, or excerpt
    const matchesContent = (
      post.title.toLowerCase().includes(search_value) ||
      post.subtitle.toLowerCase().includes(search_value) ||
      post.excerpt.toLowerCase().includes(search_value)
    );

    // Check if the post contains the tag selected in the tag menu or if
    // "All Tags" is selected
    const matchesTag = !selected_tag || post.tags.includes(selected_tag);

    // Checks if both the tags and content are cleared
    return matchesContent && matchesTag;
  });

  // Update the available posts variable, which stores *all* the posts that can
  // be displayed, possibly through pagination
  available_posts = filtered.slice();

  // Clears the post feed
  clearPostFeed();

  // Renders the first page of the new posts
  renderPosts(available_posts);
}
```

Before I talk about the pagination system, it's important to cover the rendering system that actually takes the post metadata and assembles the post HTML element that will be shown, before actually adding it the the screen. Every time the posts that should be displayed change, a call is made to a function, which is responsible for adding the posts to the page. The way it does this is by making a clone of a template element defined in the source HTML. This template has all its components labelled for easy access by the code. Then, the code works through each of the metadata properties, and fills in its corresponding data field component. What we are left with is a reference to a correctly assembled HTML element, but it hasn't been displayed yet. The solution to this is to simply select the post container element defined in the source HTML, and append the created post card to it. The end result is a clean UI containing all the correctly formatted posts. Below is an annotated copy of the post rendering function:

Now, my custom pagination implementation consists mainly of modifying the rendering system. By counting the "page" the user should be on, we can render more posts as the user clicks a button at the bottom of the page. When the button is clicked, the current page is incremented by one, and this value is used in the post rendering function to how many of the available posts should be rendered, which is simply equal to `min(available_posts, current_page * POSTS_PER_PAGE)`. For added efficiency, we only render the posts that are considered "new", which avoids the rerendering of all the posts that have already been added. The only drawback with this is that the posts need to be manually cleared every time a filter is changed, though this is only a couple added lines and a simple clear function. Below is a copy of the rendering function complete with the pagination implementation:

```js
function renderPosts(posts) {
  const post_container = document.getElementById('postContainer');
  const post_template = document.getElementById('post-template');
  const currently_loaded_posts = document.getElementsByClassName('post').length;

  posts_to_render = posts.slice(currently_loaded_posts, Math.min(posts.length, loaded_pages * POSTS_PER_PAGE));

  // Render all required posts
  posts_to_render.forEach(post => {
    const template_clone = post_template.content.cloneNode(true);
    console.log(`Rendering post: ${post.title}`);

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
```

Overall, I think this was my favorite part of the whole blog design process, because once this was done, the entire blog was pretty much completed, so it's very relieving to see. If you wish to review the full source code, it can be found [here](/js/blog.js). That's all for now.

✌,<br>Thomas