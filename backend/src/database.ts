import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carregando as variáveis de ambiente
dotenv.config();

// Criando a pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,    // Ex: 'meu_banco'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Função para inicializar o banco de dados e tabelas
const initializeDatabase = async () => {
  try {
    // Cria uma conexão fora do pool para criação do banco, se necessário
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    // Cria o banco de dados, caso não exista
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Banco de dados '${process.env.DB_NAME}' verificado/criado com sucesso.`);

    connection.end(); // Libera a conexão

    // Usa a pool para criar tabelas no banco
    const poolConnection = await pool.getConnection();

    await poolConnection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await poolConnection.query(`
      CREATE TABLE IF NOT EXISTS news (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await poolConnection.query(`
      CREATE TABLE IF NOT EXISTS favoritos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        news_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
      )
    `);

    console.log('Tabelas verificadas/criadas com sucesso.');
    poolConnection.release();
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1); // Encerra o processo caso ocorra um erro grave
  }
};

// Verificando a conexão e inicializando o banco de dados
const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    connection.release(); // Libera a conexão de volta para o pool

    // Inicializa o banco e tabelas
    await initializeDatabase();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1); // Encerra o processo caso a conexão falhe
  }
};

// Chamando a função para verificar a conexão ao iniciar o servidor
checkDatabaseConnection();

export default pool;
