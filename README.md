# About

Fully responsive MERN stack project initialized with create-react-app. It features an online movie store theme complete with:

- custom logo courtesy of shopify's Free Logo Maker
- fav icon
- custom API based on OMDb API data (circa 2023) enhanced with youtube video links
- movie filtering by genre, sorting & searching by name
- ability to mark favorites and see them in a separate page
- ability to place an order
- all interaction data stored in a MongoDB Cluster (cart, favorites, orders)

![cinemagic main page](https://images2.imgbox.com/13/e3/RBxkpauM_o.jpg)

## Technologies used

- React (frontend JavaScript library for building user interfaces based on components)
- Node.js (backend JavaScript runtime environment)
- Express.js (backend web application framework for building RESTful APIs with Node.js)
- MongoDB (NoSQL database program)
- SCSS (CSS preprocessor)

# Setup

## Client side

### Install dependencies

Navigate to the *client* directory (cd client) and run the following command in your terminal:

```
npm install
```

### Start the client

Run the following command in your terminal while inside the client directory:

```
npm start
```

The frontend will start after a short while and automatically open in your browser having the following root address: http://localhost:3000 

You should now be able to see the loading icon!

## Server side

### Install dependencies

Navigate to the *server* directory and run the following command in your terminal:

```
npm install
```

### Connect to MongoDB

This server runs based on a MongoDB cluster. You need a MongoDB account and available cluster to initialize the database.

Create a .env file in the *server* directory. 

Check out the .env.example file to see how the link to your cluster is recommended to look. Fill out the .env file with this info (can copy paste the example and change the username and password). 

### Start the server

Run the following command in your terminal while inside the server directory:

```
node server
```

Your local server should now be running at the address specified in the terminal! If you refresh the client, the page should be populated with movies.  

### Troubleshooting tip:

Make sure you give permission to your current IP to your MongoBD cluster.

# Features Summary

The main page features all the movies provided by our API. You can interact with the page by:

## Filtering displayed movies by genre

![filter movies by genre](https://images2.imgbox.com/0e/24/eNd3DBpK_o.jpg)

## Sort by title (A-Z or Z-A)

![sort movies by title](https://images2.imgbox.com/24/86/d0eZ7OOM_o.jpg)

## Search by title

![search by title](https://images2.imgbox.com/3f/cd/LtzHSWhZ_o.jpg)