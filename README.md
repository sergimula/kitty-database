# Kitty database project

Add, edit or remove kittens from this database

## Available Scripts

In the project directory, you can run:

### `json-server database/db.json`

Start the local json-server API

* Open [http://localhost:3000](http://localhost:3000/db) to view full cat db.
* Open [http://localhost:3000](http://localhost:3000/cats) to view all cats.
* Open [http://localhost:3000](http://localhost:3000/races) to view all cats races.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

This mode is created in order to work locally with the json-server

### `npm test`

Launches the jest test runner <br />
See the section about [running tests](https://jestjs.io/docs/en/getting-started.html) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This mode works with the fake API json-server online, you can do POST, PUT, DELETE... but the resource will not be really updated on the server but it will be faked as if.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Built with

* [React](reactjs.org) - A JavaScript library for building user interfaces
* [Material-UI](https://material-ui.com/) - React components for faster and easier web development.
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [json-server](https://github.com/typicode/json-server) - Get a full fake REST API with zero coding in less than 30 seconds (seriously)
