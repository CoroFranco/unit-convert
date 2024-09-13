const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el formulario enviado
app.post('/submit', (req, res) => {
  const length = req.body.length;
  console.log(req.body); // Obtener el número enviado desde el formulario
  res.send(`Número recibido: ${length}`);
  console.log(length); // Imprime el número en la consola del servidor
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
