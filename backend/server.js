// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config(); // ⬅️ Carga las variables del .env

// Importar y conectar Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Importa middleware de autenticación
const { auth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Solo permite el frontend
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());// Para recibir JSON en el body

// Ruta de prueba
app.get('/', (req, res) => {
    res.send(' Servidor funcionando correctamente');
});

// Ruta de prueba para productos (conecta con la BD)
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true, // Incluye la categoría del producto
                user: true,     // Incluye el usuario que lo registró
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos, error');
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Ruta protegida, sólo se puede acceder con token JWT válido
app.get('/api/protected', auth, (req, res) => {
    res.json({
        message: 'Ruta protegida accesible',
    });
});

//Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// Opcional: cerrar conexión de Prisma al terminar (para desarrollo)
process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log('Conexión a la base de datos cerrada');
});