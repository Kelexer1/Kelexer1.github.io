---
layout: post
categories: blog
image: Resources/KelexerLogo.svg
title: Building a blog page using Jekyll
subtitle: How I create posts efficiently using Jekyll
date: 2025-04-27
tags:
  - blog
  - website
  - tutorial
---
In my previous post, I mainly talked about the fact that the blog part of my website was live, which is *cool*, but I think what's cooler is all the juicy software and code that went into making it (excluding the hair-loss). Therefore, through the course of multiple posts, I'll dive deeper into the how and why thought process that I used to design the blog, from UI to code, to other important design considerations such as scalability and maintainability. Furthermore, I will structure it as both a documentation and tutorial set of posts, so you can follow along and make your own blog (assuming you already have a website set up). The structure of the posts will be as follows:

1. Creating posts using Jekyll
2. The UI design of the blog page
3. The JS of the blog page
4. The design of the post page

As you might have already figured, this entire website is statically hosted on GitHub Pages completely for free. While this is awesome and usually more than enough for me, it does make it a little more complicated when considering something like a blog, where ideally you could fetch posts from a server, instead of storing all of the posts on the website itself. To lessen this fallback, GitHub Pages makes use of Jekyll, a static site generator, which **does** provide a lot of useful tools for blogging and general site-building, such as…

- Basic pagination
- A simplified post creation process
- Automatic page building that supports Liquid
- A couple others that I can't think of on the spot...

However, I quickly came to the conclusion that, while speeding up the creation process, these features didn't do much to address the set up process of the blog, so I was largely on my own. I had a few important features I wanted my blog to have, namely the searching posts by content, along with tagging (and tag filtering) to allow merging of the portfolio page with the blog page. This will be important shortly.

Jekyll's post process allows users to have a folder in their sites directory, labelled `_posts`, that will contain HTML or MD files (I prefer Markdown for writing posts). The files need to follow a specific naming convention that is as follows: `YYYY-MM-DD-Title`. For example, this post's file name is `2025-04-27-BlogDesignProcess1.md`. Each post is given front-matter that will specify some data that can automatically be fetched and embedded into both the preview of the post (on the blog page), and the full post's page. For example, for this post, the YAML front-matter is as follows:

```
---
layout: post
catgories: blog
image: Resources/KelexerLogo.svg
title: Building a blog page using Jekyll
subtitle: How I create posts efficiently using Jekyll
date: 2025-04-27
tags: [blog, website, tutorial]
---
*The text you are reading goes here*
```

The layout variable simply states that this file should be rendered using the post layout, which is a template I made for presenting the post (meaning I don't have to make an HTML file for every single post). I'll go into more detail about the post page in a further blog post. The categories variable is similar to how tagging is used, but I made my own tagging system to have more control over how data is organized. Therefore, I always keep it as blog. The image, title, and subtitle, and date variables are fairly self explanatory, and you can actually see how the post layout uses these variables at the very top of the post, pretty cool right? Lastly, we have my personal favourite, the tags variable, which is a list of tags I want the post to be associated with. Its useful for filtering and conveying that kind of topics and themes will be present to the viewer before they even read.

Once the front-matter is defined, you can simply write whatever you want below it (I like using Obsidian for writing in Markdown), and that will become the content that is displayed on the post (front matter will be automatically omitted in the file users read). Funny enough, that's all the set up you need to do to make a new post, everything else is a one-time setup that is designed to handle everything, emphasizing scalability and maintainability.

Overall, I made sure that the creating posts would be as effortless and fast as possible by taking advantage of the various tools that Jekyll offers makes the entire process for blogging just a little faster. On the next post, I'll go into more detail on the UI design process for the blog page, from planning to creating. That's all for now.

✌️,<br>
Thomas