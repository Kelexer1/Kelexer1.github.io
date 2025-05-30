---
layout: post
categories: blog
image: Resources/KelexerLogo.svg
title: Designing a simple post page using Jekyll
subtitle: How I automatically create dedicated post pages using Jekyll
date: 2025-05-23
tags:
  - blog
  - website
  - tutorial
---
This is the last of the 4 part blog documentation series that covers all important creation processes of my blog. Last post, I delved into the backend JS and JSON that automated the blog post preview rendering process, along with providing a framework for multiple post filtering elements. In this final post, I will talk about how I used Jekyll and Liquid to automatically generate full sized pages for each post (not to be confused with the preview card on the blog page) that uses numerous new tools, such as Markdown, and Syntax Highlighting for code blocks.

By default, Jekyll allows users to create their posts using Markdown, which I definitely prefer over HTML because when I write a post, I want to write in English, not hieroglyphics. I discussed the post creation process in the first post of this series, so I'll omit that. However, what's important to know is that Markdown **alone** is not used for the blog. In the first post of the series, I hinted at a layout being used to define the way the content should be presented to the user. This layout uses a part of Jekyll called Liquid, which allows HTML documents to dynamically output content, allowing for easy creation of posts using a common template. For example, with my current setup, a basic `post.html` setup could be the following:

{% raw %}
```html
---
layout: default
---
<html>
	<head>
		<!-- Some header stuff here, not really important -->
	</head>
	<body>
		<h1>{{ page.title }}</h1>
		<h2>{{ page.subtitle }}</h2>
		<h3>{{ page.date }}</h3>
		<p>{{ content }}</p>
	</body>
</html>
```
{% endraw %}

As you can see, a this file contains... nothing about any specific post. This is because each post is automatically assigned a file that uses this template. Recall that when making a post, I added a value into the front matter called `layout`, which was assigned a value `post`. This tells Jekyll that the posts content should be automatically inserted into the `post.html` layout when the site is built. This also means that the front matter is inserted, meaning we can access data we defined in the post, such as the title. The only difference being that we access it using the `page` prefix instead of post, like in the JavaScript part since the *page* is embedded with the values, not the object we are iterating over using JSON. The last important consideration is the {% raw %}`{{ content }}`{% endraw %} element, which is, as the name suggests, the content of the post, which includes all the paragraphs, images, and code blocks. However, by default, the code blocks will have no syntax highlighting done to them, which leads me to the next portion of designing the post template: syntax highlighting.

Syntax highlighting is ironically the harder thing to accomplish compared to creating the entire page. Just to clarify, syntax highlighting is the way code is colored to make it more organized and readable to the viewer. If I have a basic block of code that isn't syntax highlighted in any way, it looks like this:

```
for i in range(1,10):
	if i % 2 == 0:
		print(i)
```

This is cool, but it lacks the pizzazz and cooler coolness of bright colors that get that dopamine flowing. Here is the same code with syntax highlighting, notice it looks a lot cleaner, and if you are familiar with the source language, easier to follow:

```python
for i in range(1, 10):
	if i % 2 == 0:
		print(i)
```

The problem with syntax highlighting is that there is a lot that goes on behind the scenes to parse the text code into code code so that the highlighter knows what color everything should be. Luckily, the vast majority of this can be handled by tools already made, but not included by default in Jekyll. All Jekyll sites have a file in the root folder called `_config.yml`, which acts as a settings file that Jekyll uses to determine how it should build the site, like a list of rules. In this folder, we can add the following lines:

```yml
highlighter: rogue
markdown: kramdown
kramdown:
    input: GFM
    syntax_highlighter: rogue
```

This may look confusing, but once you understand what each rule does, it makes more sense. The first line sets the highlighter to be "rogue". Rogue is a syntax highlighter that integrates well with Jekyll by default, since they are developed in the same language, `Ruby`. Rogue goes through the code block and identifies certain words and symbols according to the language the code block is defined in. For example, in the Python code block above, `if` is recognized as a keyword, and is highlighted as a conditional accordingly. The next like defines that the Kramdown should be used as the Markdown parser. Kramdown is the default parser used in Jekyll and allows certain syntax to be used, enabling things like tables, and math equations. Kramdown is essentially responsible for reading through the markdown file and converting it to an HTML file to be displayed. The last few lines are all part of the same rule, indicated by the indentation. These lines define specific settings related to Kramdown, such as enabling GitHub Flavored Markdown (GFM) as the input format. This enables additional syntax features such as multi-line code blocks, and strikethrough text. Lastly, it reinforces that Kramdown should use rogue for syntax highlighting. We need to define rogue twice because of the different contexts that each affects. The `highlighter` rule deals with site-wide highlighting, such as by using the highlight tag in Liquid:

{% raw %}
```html
{% highlight python %}
print("Hello")
{% endhighlight %}
```
{% endraw %}

On the other hand, the Kramdown indented rule `syntax_highlighter` is used for declaring that code blocks in **Markdown** should be highlighted using rogue, such as through \` (code here) \` syntax.

Now, our markdown files will be automatically converted to HTML and displayed using our layout, but the code blocks will be... not colorful. This is because rogue does *not* color the code itself, instead it tags each piece of the code with specific HTML classes, which need to be styled using a `CSS` file. We can get a premade `CSS` file using a theme obtained through rogue. By installing rogue into our project using the following terminal command: `gem install rogue`, followed by `bundle install`, we can view some popular themes by running `rougify help style`. Once we settle on a nice looking theme, we can collect the `CSS` by running the following command: `rougify style [STYLE NAME] > syntax.css`. This will create a file called `syntax.css` that contains all the style rules for coloring the code. Applying it to the layout is as simple as adding it to the header of the template file, which should look something like this:

```html
<head>
	<link rel="stylesheet" href="syntax.css">
</head>
```

Of course, you can modify the `CSS` file to add more style choices. For example, I added rounded corners to code blocks, and added a simple set of rules for code blocks without a defined language. Overall, you can change anything about the style to truly make it yours and better fit to the overall theme of your site. That's all for now.

✌,<br>Thomas