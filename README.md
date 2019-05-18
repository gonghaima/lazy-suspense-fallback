# lazy-suspense-fallback
simple demo of using lazy, suspense, and fallback

Async React using React Router & Suspense
Using Suspense and `lazy` to make asynchronous loading of React components as easy and as intuitive as you’d expect.
Go to the profile of Kevin Ghadyani
Kevin Ghadyani
Dec 11, 2018
I wrote an article about Async React Components in React Router v4 a couple years ago and since then, React’s come a long way.

Now we have Suspense and lazy, but my original article with the old way is still very popular. Since there’s a native solution to solve this problem, I’ve decided to write a new article on how to do the same thing with React v16.6.


First, we need to create a component to render in our application.

I present to you, TestComponent:


The Synchronous Way
Traditionally, this is how you’d load a component synchronously:


It imports the component directly and uses it immediately when App is loaded. This works great, but it can have the side-effect of ballooning our bundle size if we have too many imported modules that wouldn’t normally display.

The Asynchronous (lazy) Way
Instead, let’s grab the JS file for TestComponent only after App has loaded:


This looks pretty cool right? Instead of import TestComponent, we call the lazy function from React. It takes a callback and in that callback, we call the ESModule import function.

This is all possible thanks to the Suspense component. Because of the way Suspense works, you need to add a fallback prop; some component for it to show when your component isn’t yet loaded. That’s why we added a LoadingMessage component to display before TestComponent has been pulled in.

Webpack automatically code-splits your bundle when using lazy. This is probably the biggest benefit because your initial bundle size could be a lot smaller now with just a few lines of JavaScript.

This is completely different from the old method we used where we were manually creating promises and listening for response components and doing what Suspense does ourselves.

Using `require` from CommonJS
import wasn’t always available, and it’s specific to ESModules. Instead, you might be using CommonJS, so you’ll want to use require instead. Thing is, you can’t just switch one for the other because import returns a promise and require returns your component directly.

In that case, you’ll want to do something like this:


Asynchronous React Router
Ideally, we’d have TestComponent loaded only when we’re at a specific route. To handle that use case, we’re going to take TestComponent, along with some other test components, and wrap them in routes that load only when you’re at those particular routes.

In this way, we can send up a super small initial JS bundle and worry about pulling in our real content after-the-fact. It’s the same behavior you might’s seen 2–3 years ago with require.ensure with the older React Router v1–v3.

Here’s the whole kit and caboodle:


We created Route components in a Switch as usual. Using lazy and import just as we did in the first example, we were able to dynamically load those three test components only when you’ve accessed one of those routes. From here, it should be pretty simple to extrapolate this to other components and subroutes as well.

Thing is, the import syntax is pretty messy. You can clean it up by creating your own lazyImport method and using that instead:


Webpack requires static compilation so you need to do the strange template-string code I’ve shown here. But if you don’t want to worry about having to maintain and implement your own solution, well… That’s where it gets tricky.

This doesn’t work like you think.

import works by checking where a file is loaded from where the import function is called. This means if I were going to write a library for it (which I tried), it would only work for files relative to the directory of my library in node_modules/, not in your project’s root directory unless I passed in the import function directly so it’s know where to relatively import.

There are plenty of other solutions for doing this same thing like creating React components around the lazy and import functions, but that’s beyond the scope of a simple example like this.

CommonJS Issues Strike Again!
While this works and allows code-splitting because import allows for dynamic string values, it’s not going to work like you think with require. Unless you’re using require.ensure, it’s just not going to be possible to code-split because of the way Webpack handles dynamic string imports under-the-hood.

Do It Yourself
There’s a lot of code here, but you can try it out for yourself at CodeSandbox:


[EDIT]
There’s currently an issue with react-router v4.4.0 where it doesn’t handle the case of a lazy-loaded or memoized component passed in through the component prop on Route.

You will receive an error message like this:

Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
You can find out more about this issue on GitHub:
https://github.com/ReactTraining/react-router/issues/6420

Thanks to KuN GEO for pointing this out!


