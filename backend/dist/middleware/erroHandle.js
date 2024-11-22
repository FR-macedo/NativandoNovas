"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Middleware de tratamento de erros
const errorHandler = (err, req, res, next) => {
    console.error(err.message); // Log do erro (pode ser configurado para logar mais detalhes em produção)
    // Envia o erro como resposta para o cliente
    res.status(500).json({ error: err.message });
};
exports.errorHandler = errorHandler;
