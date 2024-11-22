"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashSenha = await bcryptjs_1.default.hash(password, 10);
        await database_1.default.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashSenha]);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await database_1.default.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};
exports.login = login;
