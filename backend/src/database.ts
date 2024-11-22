import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carregando as variáveis de ambiente
dotenv.config();

// Criando a pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Ex: 'localhost'
  user: process.env.DB_USER,        // Ex: 'root'
  password: process.env.DB_PASSWORD, // Ex: 'senha'
  database: process.env.DB_DATABASE, // Ex: 'meu_banco'
  waitForConnections: true,          // Habilitar espera para novas conexões
  connectionLimit: 10,               // Limite de conexões simultâneas
  queueLimit: 0                      // Limite de fila para conexões
});

// Verificando o status da conexão com o banco de dados
const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    connection.release(); // Libera a conexão de volta para o pool
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1); // Se não conseguir conectar, encerra o processo
  }
};

// Chamando a função para verificar a conexão ao iniciar o servidor
checkDatabaseConnection();

export default pool;
