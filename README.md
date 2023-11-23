# About

Fully responsive MERN stack project initialized with create-react-app. It features an online movie store theme complete with:

- custom logo courtesy of shopify's Free Logo Maker
- fav icon
- custom API based on OMDb API data (circa 2023) enhanced with youtube video links
- movie filtering by genre, sorting & searching by name
- ability to mark favorites and see them in a separate page
- ability to place an order
- all interaction data stored in a MongoDB Cluster (cart, favorites, orders)

![Cinemagic main page](https://images2.imgbox.com/63/95/zMch4hyt_o.jpg)

# Setup

1. Navigate to the *client* directory and type the npm install command in your terminal

2. Navigate to the *server* directory and type the npm install command in your terminal

[this server runs based on a MongoDB cluster, you need a MongoDB account and available cluster to initialize the database]

3. create a .env file in the *server* directory and add in your mongoDB cluster access link. The project detabase is initiated with a name of 'movie' 

example: MONGO_URL=mongodb+srv://userdooser87:NWxl3xfAHdjg1TEA@cluster0.vbg3puh.mongodb.net/movie

where *userdooser87* represents the username / 
and *NWxl3xfAHdjg1TEA* represents the associated password

4. To start the server, use the command node server in the terminal (while inside the server directory)

5. To start the client, use the command npm start in the terminal (while inside the client directory)

You should now be able to view the website in your browser!

Troubleshooting tips:

1. Make sure you give permission to your current IP to your MongoBD cluster.