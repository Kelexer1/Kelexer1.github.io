---
layout: post
categories: blog
image: Resources/KelexerLogo.svg
title: About Assembly
subtitle: My thoughts after self-teaching assembly and using it for cybersecurity
date: 2025-05-02
tags:
  - assembly
  - coding
  - cybersecurity
  - selfteaching
  - writeup
---
I've spent the past 2 weeks self teaching NASM x86 Assembly (primarily on Linux), and I wanted to share my thoughts and experiences from what I've learned, and how I plan to apply and further my skills.

Programming languages can be ranked on a sort of scale, from high level to low level. The "higher" level a language is, the closer the syntax to human readable language. Take python for example, where printing a message to the console is as easy as the one line solution:

```python
print("Hello, world!")
```

Of course there is a lot more going on behind the scenes automatically, which is why high level languages like Python are so easy to learn and write in compared to other languages. Now this automation usually comes at the cost of speed and bloat, where code may not be fully optimized due to the automated optimizations and extra features of the language that your program may not require. That's where lower level languages, like C, come into play. When you write code in C, you are expected to manage a lot more with your code than simply the syntax. With C, you are expected to manually manage your computer memory, and forgo commonly used features, like object-oriented programming. This however, comes at the benefit of *much* faster runtimes compared to languages like Python (even if you account for the fact that Python is interpreted, not compiled). Additionally, lower level languages allow you to work much closer to the hardware of the computer, such as the memory, as previously mentioned. This can allow for much more optimizations in your code, as well as accomplishing tasks that are just not realistic in higher level languages (think device drivers, etc.). For comparison, here is the same code as above, but written in C instead:

```c
#include <stdio.h>

int main() {
	std::cout << "Hello, world!" << std::endl;
	return 0
}
```

Now, notice that I haven't mentioned where assembly fits into all of this, and I'm getting to that. I mentioned how python is interpreted, not compiled, which basically means the computer reads it line by line and works with the code that way. Compiled languages convert your code into assembly (CPU instructions), which the computer then works with. This is how compiled languages run so fast. Of course, there is more nuance to how this stuff works, but it is a very broad and complicated topic (I also have never explicitly learned about it, yet), though this is a high level explanation. Now, here is the same code written in NASM x86 Assembly (Linux), which would then need to be manually assembled and linked to be ran:

```nasm
section .data
	output DB "Hello, world!", 10

section .text
	global _start

_start:
	MOV eax, 4
	MOV ebx, 1
	MOV ecx, output
	MOV edx, 14
	INT 80h

	MOV eax, 1
	MOV ebx, 0
	INT 80h
```
As you can see, assembly appears to be maybe just a *little* bit harder to read. In fact, I wrote this program on my own, and it took 6 days to know enough about the language in order to be able to create it

Assembly used to the the language that hid under my bed at night, and that was mostly reinforced by things like YouTube Shorts and Instagram Reels, where they portray assembly as the boss battle of programming languages. And don't get me wrong, I still think it is, but I can now say that the difficulty is *not* as high as media claims it to be.

I originally wanted to pick up assembly for a few reasons. Namely, I wanted to further my cybersecurity skills by getting started on reverse engineering programs. When you run a file like a `.exe` on your computer, you are actually executing a binary file of machine code, which can be decompiled to assembly using a tool known as a decompiler. Now, while you can continue to go "higher" into even more readable languages, the output will become increasingly nonsense, as there is *many* ways to make code with the same output, so the decompiler has no way of determining the "correct" output, so it will try to guess, which doesn't always work out well. That's why assembly is preferred for reverse engineering. By the end of this initial learning phase, I wanted to take part in a "crack me" to see if I could actually read real programs decompiled into assembly and reverse engineer / modify them to create desirable results, in this case being able to gain access to a software without a licence key. Don't worry, crack me's are mock software's designed to be reverse engineered, so there is nothing illegal about it.

Secondly, I wanted to actually be able to read and write in assembly using documentation, and not AI like ChatGPT. Of course, in the process of learning it, I would memorize a lot of commonly used instructions, but learning how to read detailed documentation is a beneficial skill independent of programming language. I would also be able to demonstrate this by reverse engineering a program.

I mainly learned the language using the following playlist, which was super helpful and easy to follow along, although I was on my own when figuring out how to set up a Linux VM and install all the required packages.
<iframe width="819.5" height="461" src="https://www.youtube.com/embed/yBO-EJoVDo0?list=PL2EF13wm-hWCoj6tUBGUmrkJmH1972dBB" title="Foundations of Assembly Programming - Binary Numbers" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
Once I completed all the videos in the playlist that dealt with assembly programming (omitting the operating system content in the second half) I felt I had a pretty solid understanding of the material, and I was already able to code basic programs with minimal additional learning resources. Therefore, I made my first attempt at using Ghidra to reverse engineer a crack me that I got from [https://www.crackmes.one](https://crackmes.one/crackme/67fd376f8f555589f3530b9d).
## Crack Me Write Up

The first step was to run the program itself and try to get a high understanding of how the program worked. Entering an invalid key gave a specific string error message, which is crucial for reverse engineering. If I could find the string reference in the decompiled assembly, I could find what parts of the code are causing the message to be displayed, then backtrack to find the code for the block that determines whether the key is valid.

![Image of invalid key result](/Resources/BlogResources/2025-05-02-AboutAssembly/InvalidKey.jpg)

Then, we can use Ghidra to decompile the program, which will give us access to all the scary looking source code (the program itself was written in `C` or `C++`, then compiled into this). Ghidra looks complicated to use (because it is), but 99% of the features are not required to complete a basic crack me like this. Analyzing the file will format the source code into the assembly we are looking for.

![Image of Ghidra analyze menu](/Resources/BlogResources/2025-05-02-AboutAssembly/GhidraAnalyze.jpg)

After that, we can use the string search tool to scan the entire source code for the text "Invalid Licence". This is helpful because, as previously mentioned, we can find what part of the code is telling the program to give the warning message, and change it to always accept an invalid key.

![Image of Ghidra string search tool](/Resources/BlogResources/2025-05-02-AboutAssembly/GhidraString.jpg)

As you can see in the image, we have located two important strings, the invalid key string, and the valid key string. It doesn't really matter which one we follow through the code, as they should end up at roughly the same spot in the code. We will follow the invalid key string for consistency, which takes us to the following block of code:

![Image of Ghidra string trace](/Resources/BlogResources/2025-05-02-AboutAssembly/GhidraStringTrace.jpg)

**A quick note: The comment reading "Success Code" should say "Display Message Box"**

In the this image, I have highlighted important CPU instructions in yellow, and comments I have made explaining the code in blue, since Ghidra's GUI can be overwhelming to look at. Additionally, I have traced the flow of the code for valid and invalid keys in blue and red, respectively. In general, though, this code checks if the value in register R14B (This is related to the value the user entered, but it may have been altered or have other stuff done to it before this point). If the value is equal to 0, meaning the string is empty or contains only null bytes, then the code jumps to the invalid licence prompt, which is assigned the label `LAB_1400017e4` by Ghidra (labels are segments of code with a specific title). Otherwise, it continues and goes straight to the success prompt. To make this code work in our favor, we want the code to never enter the invalid key label, since that will set the message values to be the incorrect key values. We can do this by negating the condition of the jump instruction from equals 0, to not-equals 0. When we do this, we effectively make incorrect keys correct, and correct keys incorrect. Applying this fix is as simple as modifying the second yellow-highlighted instruction to be `JNZ LAB_1400017e4` instead of `JZ LAB_1400017e4`. Now, when we enter an invalid key, it will not go into the incorrect key label, and will instead set the value of the message box to be the values that indicate a successful key, then it will jump to label `LAB_1400017f2`, which will display the message box with whatever values have been set, whether from the success or fail parts of the code. We are now left with the following assembly instructions:

![Image of patched assembly instructions](/Resources/BlogResources/2025-05-02-AboutAssembly/GhidraPatched.jpg)

Exporting this new program gives us an executable that is identical in every way, except its set to accept invalid license keys as valid. We can verify this by running the new program and entering a random value.

![Image of final result](/Resources/BlogResources/2025-05-02-AboutAssembly/GhidraFinal.jpg)

And just like that, we have cracked this mock software using the power of assembly and decomplication. Even though this is a very easy task compared to real-world applications of decompilation, I am still proud of myself for being able to do this on my own with minimal supplementary learning (except googling what `LEA` and `TEST` do, since the course I used didn't cover them). I plan to continue to further my assembly skills along with my cybersecurity skills by delving into more advanced topics now that I have a strong foundation to build off of.

That's all for now.

✌️,<br>Thomas