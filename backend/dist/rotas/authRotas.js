"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControler_1 = require("../controle/authControler");
const router = express_1.default.Router();
router.post('/register', authControler_1.register);
router.post('/login', authControler_1.login);
exports.default = router;
