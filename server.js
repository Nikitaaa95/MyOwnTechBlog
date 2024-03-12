const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Configure handlebars
const hbs = exphbs.create({
  extname: '.handlebars', 
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
});

// Set handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// Routes
app.use(routes);

// Sync Sequelize models and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
