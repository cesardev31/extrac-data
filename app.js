// index.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Archivos estáticos
app.use(express.static('public'));

// Rutas
const dataController = require('./controllers/dataController');
app.use('/', dataController);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
