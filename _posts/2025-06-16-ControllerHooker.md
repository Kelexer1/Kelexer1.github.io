---
layout: post
categories: blog
image: Resources/KelexerLogo.svg
title: Controller Hooker
subtitle: A fast and easy way to enable your OpenVR applications to modify pose data
date: 2025-06-16
tags:
  - project
  - cpp
  - openvr
  - visualstudio
---
*"OpenVR ControllerHooker is a custom OpenVR driver for SteamVR that intercepts controller pose updates in real-time. It exposes an easy-to-use client-side API via shared memory, allowing external applications to read and modify numerous properties of controllers, such as position, velocity, and rotation."*

[Repository Link](https://github.com/Kelexer1/OpenVR-ControllerHooker)

If you keep track of my blog posting frequency, you may have noticed that I have been gone for almost a month. I spent that time immersed in the world of OpenVR application and drivers, attempting (and succeeding after many failures) to create my own.

OpenVR is a widely used SDK and API that enables VR hardware from many vendors to work with a common runtime, SteamVR. This means that developers don't need to write different code for each headset. Since the SDK is open-source, you are able to make your own applications and drivers that take advantage of the extensive API the OpenVR SDK provides. For context, an OpenVR application is, well, an application. It can interact with various OpenVR APIs to accomplish tasks like reading button inputs, and overall working with devices that are already there. On the other hand, OpenVR drivers are responsible for the "already there" part. Drivers are responsible for creating the actual devices and telling OpenVR how to use them.

Originally, I wanted to start out slow, and make a simple application that let me make many smaller "tools", that the application would manage and let the user use. The goal was to have the opportunity to experiment freely with various parts of the API, without having to commit to one specific purpose for the project. Since that project is *not* ControllerHooker, I will not go too into depth on that project as it will have it's own post when it's finally finished. However, it is important to know that I needed my application to read and modify controller poses and pose components, such as position, rotation, etc. I found out the hard way that OpenVR doesn't actually allow you to modify anything about controllers that you didn't "create" through your own custom driver. Therefore, I needed to find a way to either create perfect copies of my real controllers that I "created", or I needed to somehow intercept pose update requests from inside SteamVR itself.

Since this was a very large and tangent feature from my original goal, I decided it best to split off this driver into its own project, with a heavier focus on client API so that others with the same problem as me could utilize the driver.

Luckily, at this point I had learned the basics of OpenVR applications through the partial development my original application, so learning how to make OpenVR drivers was a little easier (though I still spent a couple days consulting documentation, going back and forth with ChatGPT, etc.). However, getting the driver to load successfully is the easiest part by far. No matter what I tried, I wasn't able to get anywhere close to mimicking real controllers through a custom driver. I later found out this is because OpenVR drivers can't access resources such as binding profiles and render models that are outside the drivers root folder, meaning unless I wanted to manually copy, paste, and enumerate every single possible mainstream VR controller, emulation was off the table.

That's when I remembered another OpenVR driver that I've used in the past, [OpenVR InputEmulator](https://github.com/matzman666/OpenVR-InputEmulator). OpenVR input emulator has a lot of the same features that I needed, namely that it managed to manipulate controller pose data. Upon a long look into its source code, I found that it used a tool called [MinHook](https://github.com/TsudaKageyu/minhook) , a function hooking library, to intercept internal pose update calls within SteamVR. This allowed it to override pose data before it reached the runtime. So, with the newfound knowledge in hand, and lots of research into how to use MinHook, I managed to successfully intercept and manipulate pose data in real time.

With a solid foundation to build off, I was able to shift my focus into developing an easy-to-use client API, through a couple header files and a static library that clients could link against. There were a couple of notable challenges I had to overcome while developing the API. Figuring out how to structure the API in a way that was functional, maintainable, and as clear as possible proved difficult, since I had never created such an extensive API. The fact that I had never used, or heard of shared memory at that point didn't help all that much, since I didn't know how the implementation would alter the structure of the vision I originally had. However, after I self-taught the fundamentals of shared memory, I was able to create a comprehensive API that felt natural to use. It featured a class for shared memory handling, event listeners, and a command sender to interface with the driver. The shared memory handles low-level communication between driver and client, while the event listener allows client applications to receive real time pings from important events, such as pose requests from the driver. Lastly, the command sender serves as a higher-level wrapper for the shared memory, incorporating thread-safe logic and built in error checking that makes pose manipulation a single line task.

Despite the numerous challenges I had to overcome while developing this project, ControllerHooker now fills a niche gap in the OpenVR ecosystem, enabling real-time pose manipulation for existing controllers through a clean, developer-friendly API. In the future, I plan to extend the functionality to also be able to read and write button inputs, such as triggers and joysticks. That's all for now.

✌️,<br> Thomas