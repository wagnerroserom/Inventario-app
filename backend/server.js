// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config(); // ⬅️ Carga las variables del .env

// Importar y conectar Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Para recibir JSON en el body

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ Servidor funcionando correctamente');
});

// Ruta de prueba para productos (conecta con la BD)
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await prisma.product.findMany({
            include: {
                category: true, // Incluye la categoría del producto
                user: true,     // Incluye el usuario que lo registró
            },
        });
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//Ruta protejida de ejemplo
app.get('/api/protected', (req, res) => {
    res.json({ message: 'Ruta protegida accesible', user: req.user });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// Opcional: cerrar conexión de Prisma al terminar (para desarrollo)
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});