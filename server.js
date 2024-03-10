const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const homeRoutes = require('./controllers'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: false
}));


app.use(require('./controllers'));
app.use('/', homeRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
