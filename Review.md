# Review Questions

## What is Node.js?
    A runtime enviroment, a program that runs other programs and turns/compiles the language into something the computer can understand.

## What is Express?
    Express is middleware for node.js, making it easier to make applications, doing alot of the heavy lifting behind the scenes.

## Mention two parts of Express that you learned about this week.
    You have to yarn/npm add it, and if you forget the server.use(express.json()); nothing will work the way it should XD.

## What is Middleware?
    Middleware sits between a runtime enviroment and the fianl request handler, it helps make writing code easier either with built-in functions/methods or you can make your own.

## What is a Resource?
    what express uses to access urls, so you can use GET, POST, etc.

## What can the API return to help clients know if a request was successful?
     A message, and/or a status code.

## How can we partition our application into sub-applications?
    By functionality, type, or a hybrid of both. Such as putting all the posts fuctionalities together, or putting all you routes in their own file.

## What is express.json() and why do we need it?
    it connects express to your application/server. Without it the computer wont be able to read what you are trying to hav it do.
