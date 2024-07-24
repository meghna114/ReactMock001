# Infinite Scrolling react
To create a react application on your local syatem start with:
```bash
mkdir ReactMock01
cd ReactMock01
npx create-react-app Infinite-Scrolling
cd Infinite-Scrolling
```




This project was bootstrapped with  git([https://github.com/facebook/create-react-app](https://github.com/meghna114/ReactMock001)).
##overview

This React application demonstrates infinite scrolling functionality. It fetches posts from API and displays them in chunks of 20. The app includes a loading indicator and I used  here 4 seconds loading, that shows up during data fetches and handles scrolling to fetch more posts as the user scrolls down.
## Project Structure
```css
react_mock01/
|-infinite-scrolling/
│
├── public/
│   ├── index.html
│
├── src/
│   ├── App.js
│   ├── index.js
│   ├── InfiniteScrolling.js
│   └── App.css
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```
1  public/: Contains the static index.html file where the React app is mounted.

2 index.html: The HTML template for the React application.
3 src/: Contains the source code for the application.

4 App.js: The main App component that includes the InfiniteScrolling component.
5 index.js: The entry point of the React application, responsible for rendering the App component into the DOM.
6 InfiniteScrolling.js: The component implementing the infinite scrolling functionality.
7 App.css: The stylesheet for the App component.
8 .gitignore: Specifies files and directories to be ignored by Git.

9 package-lock.json: Automatically generated file that locks the versions of dependencies.

10 package.json: Defines the project's dependencies and scripts.

11 README.md: This file.



## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



