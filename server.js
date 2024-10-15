const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db/dbConfig');
const salaRoutes = require('./routes/salaRoutes');
const materiaRoutes = require('./routes/materiaRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const port = process.env.API_PORT || 3333;
const apiName = process.env.API_NAME;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/salas', salaRoutes);
app.use('/materias', materiaRoutes);
app.use('/turmas', turmaRoutes);
app.use('/alunos', alunoRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`${apiName} rodando na porta: ${port}`);
});
