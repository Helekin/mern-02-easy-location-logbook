# About The Project

This project is a comprehensive exercise corresponding to Maximilian Schwarzmüller's Udemy course, "React, NodeJS, Express & MongoDB - The MERN Fullstack Guide" (last updated in November 2023). It serves as a platform for a location log developed using the MERN stack.

- [Udemy Instructor](https://www.udemy.com/user/maximilian-schwarzmuller/)
- [Udemy Course](https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/)

## Getting Started

### Prerequisites

- Use any code editor

### Installation

1. Clone the repo

```sh
git clone https://github.com/Helekin/mern-02-easy-location-logbook.git
```

2. Rename the `.env.example` file to `.env` and add the following

```sh
NODE_ENV="development"
PORT="5000"
MONGO_URI="YOUR_MONGO_API_KEY"
JWT_SECRET="YOUR_JWT_SECRET_KEY"
API_KEY="YOUR_GOOGLE_API_KEY"
```

3. Install dependencies (backend & backend)

```sh
npm install
cd frontend
npm install
```

4. Runs the app in the development mode

```sh
npm run dev
```

### API

The `easy-location-logbook.json` file can be loaded into the program known as Postman to review all the APIs generated in the backend.

## Bug Fixes, corrections and code FAQ

This code was developed using `Vite.js` instead of `Create React App`, a choice that aligns with the React documentation's suggestion of employing an alternative frontend tool.

This iteration might feature alterations compared to the initial course code, including modifications in file names, functions, or variables.

### Project Restructuring

Due to the requirement of a paid version by Google for using its API to obtain geoposition, this option has been removed. Now, only the address of the location is needed. Although the map display feature for the location is no longer available, it is left to the user's discretion to add or omit this option using the original code.
The changes can be viewed at:

> backend
> - [models/place.js](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/backend/models/place.js)
> - [controllers/places.js](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/backend/controllers/place.js)
>
> frontend
> - [frontend](https://github.com/Helekin/mern-02-easy-location-logbook/tree/main/frontend)

### Usage of Redux, React-Redux, and Redux Toolkit

Since the original version uses `axios` to call APIs, we have transitioned to using `Redux` to enhance page performance and gain a better understanding of this more comprehensive tool, commonly employed in medium to large-scale projects.
The new files can be found in:

> frontend
> - [store.js](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/frontend/src/store/store.js)
> - [slices](https://github.com/Helekin/mern-02-easy-location-logbook/tree/main/frontend/src/slices)
> - [main.jsx](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/frontend/src/main.jsx)

### Changes in React Router Dom

As the `react-router-dom`` library has evolved since the creation of the original code, the way it is used has also changed.
The main alteration can be observed at:

> frontend
> - [main.jsx](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/frontend/src/main.jsx)

### FAQ: How do I use Vite instead of CRA?

There are a few differences you need to be aware of using Vite in place of CRA.

#### Setting up the proxy

Using CRA we have a "proxy" setting in our frontend/package.json to avoid breaking the browser Same Origin Policy in development. In Vite you have to set up our proxy in your [vite.config.js](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/frontend/vite.config.js)

#### Setting up linting

By default CRA outputs linting from eslint to your terminal and browser console. To get Vite to ouput linting to the terminal you need to add a plugin as a development dependency.

```sh
npm i -D vite-plugin-eslint
```

The changes can be seen as follows:

> - [vite.config.js](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/frontend/vite.config.js) 

#### Setting up the eslint file

By default the eslint config that comes with a Vite React project treats some rules from React as errors which will break your app.

The changes can be seen as follows:

> - [.eslintrc.cjs](https://github.com/Helekin/mern-02-easy-location-logbook/blob/main/frontend/.eslintrc.cjs)

## License

Distributed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact

Github: [https://github.com/Helekin](https://github.com/Helekin)
