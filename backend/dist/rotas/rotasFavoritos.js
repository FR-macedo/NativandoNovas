"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favoritosControler_1 = require("../controle/favoritosControler");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/add', authMiddleware_1.authenticateToken, favoritosControler_1.addFavorite);
router.get('/', authMiddleware_1.authenticateToken, favoritosControler_1.getFavorites);
exports.default = router;
