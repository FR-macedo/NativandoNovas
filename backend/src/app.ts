import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './rotas/authRotas';           // Suas rotas de autenticação
import favoriteRoutes from './rotas/rotasFavoritos'; // Suas rotas de favoritos
import { authenticateToken } from './middleware/authMiddleware'; // Middleware de autenticação
import { errorHandler } from './middleware/erroHandle';        // Middleware de erro
import './types/express';  // Tipos personalizados (caso necessário)

// Inicializa o app
const app = express();

// Configuração de middlewares
app.use(bodyParser.json());  // Middleware de análise do corpo da requisição (body-parser)

// Rotas de autenticação e favoritos com autenticação
app.use('/api/auth', authRoutes); // Rota de autenticação
app.use('/api/favorites', authenticateToken, favoriteRoutes); // Rota de favoritos com autenticação


app.use(errorHandler);  // Middleware que trata os erros
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta o app
export default app;
