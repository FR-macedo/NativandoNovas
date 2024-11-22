"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRotas_1 = __importDefault(require("./rotas/authRotas")); // Suas rotas de autenticação
const rotasFavoritos_1 = __importDefault(require("./rotas/rotasFavoritos")); // Suas rotas de favoritos
const authMiddleware_1 = require("./middleware/authMiddleware"); // Middleware de autenticação
const erroHandle_1 = require("./middleware/erroHandle"); // Middleware de erro
require("./types/express"); // Tipos personalizados (caso necessário)
// Inicializa o app
const app = (0, express_1.default)();
// Configuração de middlewares
app.use(body_parser_1.default.json()); // Middleware de análise do corpo da requisição (body-parser)
// Rotas de autenticação e favoritos com autenticação
app.use('/api/auth', authRotas_1.default); // Rota de autenticação
app.use('/api/favorites', authMiddleware_1.authenticateToken, rotasFavoritos_1.default); // Rota de favoritos com autenticação
app.use(erroHandle_1.errorHandler); // Middleware que trata os erros
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
// Exporta o app
exports.default = app;
