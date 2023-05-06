const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//loading custom components
app.use(express.static('cp-components'));
 
app.get('/', (req, res, next) => {
  res.render('starting-page', { message: 'Hello from Node.js' });
});

app.listen(3000);
