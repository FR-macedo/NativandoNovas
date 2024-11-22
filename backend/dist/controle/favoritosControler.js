"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = exports.addFavorite = void 0;
const database_1 = __importDefault(require("../database"));
const addFavorite = async (req, res) => {
    // Agora TypeScript sabe que req.user é do tipo User
    const { id: userId } = req.user; // Desestruturando userId do req.user
    const { item_id } = req.body;
    try {
        await database_1.default.execute('INSERT INTO favorites (user_id, item_id) VALUES (?, ?)', [userId, item_id]);
        res.status(201).json({ message: 'Favorito adicionado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar favorito' });
    }
};
exports.addFavorite = addFavorite;
const getFavorites = async (req, res) => {
    // Agora TypeScript sabe que req.user é do tipo User
    const { id: userId } = req.user; // Desestruturando userId do req.user
    try {
        const [rows] = await database_1.default.execute('SELECT * FROM favorites WHERE user_id = ?', [userId]);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar favoritos' });
    }
};
exports.getFavorites = getFavorites;
