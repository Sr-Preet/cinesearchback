const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

// middleware
const corsOptions = {
  origin: "https://cinesearchfront.onrender.com", // frontend URI (ReactJS)
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(corsOptions));

// serve client/build as static assets in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT} 🚀`));
});
