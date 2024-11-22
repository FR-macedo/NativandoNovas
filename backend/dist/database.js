"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carregando as variáveis de ambiente
dotenv_1.default.config();
// Criando a pool de conexões com o banco de dados
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST, // Ex: 'localhost'
    user: process.env.DB_USER, // Ex: 'root'
    password: process.env.DB_PASSWORD, // Ex: 'senha'
    database: process.env.DB_DATABASE, // Ex: 'meu_banco'
    waitForConnections: true, // Habilitar espera para novas conexões
    connectionLimit: 10, // Limite de conexões simultâneas
    queueLimit: 0 // Limite de fila para conexões
});
// Verificando o status da conexão com o banco de dados
const checkDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
        connection.release(); // Libera a conexão de volta para o pool
    }
    catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
        process.exit(1); // Se não conseguir conectar, encerra o processo
    }
};
// Chamando a função para verificar a conexão ao iniciar o servidor
checkDatabaseConnection();
exports.default = pool;
