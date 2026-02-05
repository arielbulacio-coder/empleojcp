const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./src/config/database');
const { Course } = require('./src/models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/jobs', require('./src/routes/jobRoutes'));

// Basic routes
app.get('/', (req, res) => {
    res.send('API Empleos José C. Paz running');
});

// Sync database and seed examples if needed
const PORT = process.env.PORT || 5000;

const seedExampleCourses = async () => {
    const count = await Course.count();
    if (count === 0) {
        const examples = [
            { title: 'Armado de CV', description: 'Aprendé a destacar tus habilidades y experiencia en un currículum profesional.', duration: '4 semanas', isExample: true },
            { title: 'Oratoria', description: 'Mejorá tu capacidad de comunicación y expresión oral ante audiencias.', duration: '6 semanas', isExample: true },
            { title: 'Normas de seguridad e higiene', description: 'Conocimientos fundamentales para un entorno laboral seguro.', duration: '5 semanas', isExample: true },
            { title: 'Habilidades blandas', description: 'Desarrollá empatía, trabajo en equipo y liderazgo.', duration: '4 semanas', isExample: true },
            { title: 'Excel para administración', description: 'Dominio de planillas de cálculo para gestión administrativa.', duration: '8 semanas', isExample: true },
            { title: 'Word para administración', description: 'Procesamiento de textos profesional para la oficina.', duration: '4 semanas', isExample: true }
        ];
        await Course.bulkCreate(examples);
        console.log('✅ Example courses seeded');
    }
};

sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database connected & synced');
    seedExampleCourses();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Unable to connect to the database:', err);
});
