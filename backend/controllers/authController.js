// controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registro de usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
    // Verificar si el usuario ya existe
    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userExists) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const user = await prisma.user.create({
        data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // Por defecto
        },
    });

    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: 'Usuario registrado con éxito',
    });
        } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
    // Buscar usuario por email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
        token,
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        },
        message: 'Inicio de sesión exitoso',
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
    }
};