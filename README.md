# Blog Client

This project showcases a React application for a blog as a part of the [Odin Project](https://www.theodinproject.com/lessons/nodejs-blog-api) curriculum. Blog posts can be read by anyone. Users can sign up and log in to leave comments on posts. Admins can write, edit, and delete blog posts. This application connects to a backend API which can be found [here](https://github.com/snaeem3/blog-api).

## Skills involved with this project

- [Axios](https://www.npmjs.com/package/axios?activeTab=readme) to communicate with the NodeJS server
  - `GET`, `POST`, `PUT`, and `DELETE` requests
  - JSON Web Token (jwt) storage and decoding
  - Axios interceptor to include token information when sending a request
- React functional components
- React hooks
  - `useState`
  - `useEffect`
  - `useContext` to store user info locally (`isLoggedIn`, `isAdmin`, `userId`)
- React Router (`BrowserRouter`, `Link`, `useNavigate`)
- React props to pass data and functions between components
- Conditional rendering based on log-in status, admin status, etc.

## Installation

To install the application and its dependencies, follow these steps:

1. Clone the repository

```shell
git clone https://github.com/snaeem3/blog-client.git
cd inventory-application
```

2. Install the required packages

```shell
npm install
```

3. Update `src/config.js` with the URL of your blog API. Otherwise, http://localhost:3000 will be used by default.

## Usage

To run the application, you can use the following command:

```shell
npm run dev
```

Then, open the app in your web browser by navigating to http://localhost:5173.
