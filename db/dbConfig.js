const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`Conexao com o banco ${process.env.DB_NAME}foi bem-sucedida.`);
  } catch (error) {
    console.error('Não foi possível se conectar ao banco de dados', error);
  }
}

testConnection();

module.exports = sequelize;
