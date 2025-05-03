---
layout: post
categories: blog
image: Resources/KelexerLogo.svg
title: Designing the UI of my blog
subtitle: How I conceptualized, designed, and built the UI of my blog
date: 2025-05-02
tags:
  - blog
  - website
  - tutorial
---
In my last blog post, I talked about how I used the finalized blog to expedite the post creation process by taking advantage of tools I created, and others such as Jekyll, GitHub Pages, and Obsidian. In this post, Ill delve deeper into the front end UI design process behind the blog, from conceptualizing the UI, to making a mock UI, to creating the HTML and CSS.

In my opinion, the hardest part of making a page is figuring out what you want the page to look like. I wouldn't consider myself an artist or expert designer, so I'm basically working off the same level of skill as any other person. It didn't help that I didn't really even know what I wanted the page to look like in my head, let alone making a concrete feature list, so that was the first step. What I found really helped was looking at online resources, such as blog examples, and making a list of all the cool stuff I found, regardless if I wanted to include it in the final product. Additionally, I found generative AI very helpful for brainstorming cool ideas, even though after a few prompts all the creativity seemed to drain out. Once I had a list of features and other design considerations, I was able to move onto the next step, making a mock UI.

I used my iPad to draw the mock-up by hand. While I am sure there are better graphic design tools out there to make the process likely easier (Figma *cough cough*), I liked having that ease of creating and deleting specific aspects, as well as the more personal touch it gave the mock-ups. This is also the stage where I started considering the technical aspects of the page, such as the search features. Having a comprehensive list of stuff I wanted to have, and narrowing it down by eliminating unneeded stuff turned this into more of a puzzle assembling task rather than a mental gymnastics one. Another thing that really helped is labelling specific elements of the mock-up UI. For example, adding labels to what specific buttons would do etc. really helped cement a vision of the final product in my head, which is definitely required for the last step. Below is an image of the current state of the mock-up drawing. There are a couple of things I want to point out about it. First, you might notice that some stuff is not the same as the final product, which is perfectly fine considering this is a mock-up that was made in about 30 minutes. Secondly, items highlighted in yellow are currently not implemented (as of writing this post), so the mock-up can double as a sort of interactive to-do list.

![Blog UI Mockup](/Resources/BlogResources/2025-05-02-BlogDesignProcess2/Mockup.png)

Once I had the mock-up, I was able to start the process of translating it into HTML and CSS, starting with the HTML. The best way I found to do this was to make the page from top to bottom, and grouping related elements together (pretty standard practice). Then, I could use my knowledge of HTML to create the proper elements in the correct order, and group them using `divs`, which serve to group content in HTML. After this, I was left with a basic scaffolding of the blog page, excluding any actual posts, as those need to be implemented with a mix of JS, though I did make a template using the `template` tag that I could clone in the JS portion to render posts.

The next and final step was implementing the CSS styling to make the site look good. I would also like to point out that the mock-up drawing is severely lacking in the styling department, as it omits many critical details like colouring and other styling choices. I was aware this would be a problem when I made it, but I chose to go along with it anyways because I was still unsure about the structure, let alone the styling. As a result, this stage had a lot more thinking and planning compare to the HTML stage. Of course this resulted in a longer time to implement, especially between consulting various resources about obscure CSS tags so that the entire site didn't look like melting candle wax. Some important considerations I made when designing the CSS was, first and foremost, conformity to general themes of the site, such as colour and font. Additionally, I wanted to keep a sort of minimalist look that had clear separations between different posts, while also being spacious with large margins.

Overall, the design of the blog was probably my *least* favourite part of the entire process, but I'm very happy with how it turned out. I am still planning to add numerous things to the blog page, including...

- A footer
- Some form of pagination
- A better background (will be used site-wide)

However, these features are outside of the scope of this post and will likely have their own posts in the future. That's all for now.

✌️,<br>Thomas