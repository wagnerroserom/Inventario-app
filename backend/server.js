const express = require('express');
const cors = require('cors');
const morgan = require ('morgan');

//Inicializar  el servidor
const app = express();

//Configurar middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Puerto del servidor
const PORT = process.env.PORT || 4000;

//Ruta raiz
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de inventario');
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

