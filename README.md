# Mikey's Horror Flick Reviews

## Why this kind of app?

While considering what sort of projects I might like to build to show my newly acquired web development skills I felt I wanted to build projects that were visually interesting, technically accomplished as well as easy to use for the user - with accessibility built in to ensure users of all capabilities could use all the functionality on offer. 

I also wanted my project to reflect me and my hobbies - so I landed on creating a horror film review app. 

I wanted to add my own reviews to reflect my own opinions of my favourite horror films and I wanted to give users an opportunity to add their own reviews too.

## What technologies did you use?

I knew there would be lots duplicated code and using lots of components felt like a natural answer to that so I wanted to use React to build my app. I also wanted to flex my React Router skills Outlet and Layout components here have been effective. I had a lot of fun tinkering around and getting that to work as I wanted it. 

## What challenges did you face?

Retrieving data from the OMDb api and combining that with the pre-existing film reviews and then using localStorage to store it all was a whole bunch of complexity I hadn't really experienced in such a full on way before. Interestingly, the biggest complication was trying to debug the code when any testing data you save will persist in the browser between sessions - this can cause a lot of confusion if you start to code bleary-eyed before your kids get up on a Saturday morning. 

Another challenge was the difference between the Flick, the edit view for a Flick and the pre-search placeholder. These elements all seem very similar and beg for having a component to use but the differences as development continued meant this wasn't possible. This caused a lot of complexity to my CSS that I hadn't foreseen and some classname headaches

My large flipping section, while snazzy to look at, caused a lot of issues around accessibility. There have been a lot of lessons learned on this side and I will be more mindful of considering accessibly while planning out any future apps. 

## What went well?

My knowledge around error handling has increased. Prior to this project it was an afterthought really but from now on I will consider the error handling as a fundamental part of my fetching logic instead. I will always go into projects with this mindset going forward rather going away and coming back for error handling as if it's something separate to the whole. 

I've used conditional rendering a lot for this app. I've endeavoured to keep straightforward in my code so anyone reading it can follow what's happening as easily as possible which has been a challenge in itself. When deep in the coding flow it's easy to forget that others (including yourself in the future) will have to read and understand it. Each time I've found a bug with a long ago written bit of code I've been able to locate it in my old code without to much trouble which I'm happy with. 

I've also really had a good play around with Clamp on this project which has been fun and also saves a lot of code in media queries

## Final thoughts

I always take the time when finishing a project to look back at what I've done and how I might do things differently if I started again. 

For this project I would spend more time considering how I might build sections as components with more conditionally rendered class to change their look and layout. 

I'd also remove the flipper as it caused a lot of problems and looking back - outside of visual flair - it doesn't add anything to the app. I feel I may have been able to reduce the search to one input and have it return local results and online results as one for the user.

However, I'm super proud of this project. Every core idea that I had when I originally conceptualised this project I've been able to bring to life as I imagined it - even if I had no idea how to do so at the time! 

Looking at my own code to me it looks concise and professional and I'm proud of how far I've managed to come so far on my web dev journey.
