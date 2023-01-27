const express = require('express');

// ...

const app = express();

app.use(express.json());

// ...

app.get('/', () => console.log('Starting project'));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
