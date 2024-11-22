"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new Error('Token de autenticação é necessário')); // Usando next() com erro
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(new Error('Token inválido')); // Passando erro para next()
        }
        // Atribui a propriedade user com o tipo User
        req.user = user;
        next(); // Chama o próximo middleware ou a função de rota
    });
};
exports.authenticateToken = authenticateToken;
