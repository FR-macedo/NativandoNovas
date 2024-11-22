import { Request, Response, NextFunction } from 'express';

// Middleware de tratamento de erros
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.message);  // Log do erro (pode ser configurado para logar mais detalhes em produção)

  // Envia o erro como resposta para o cliente
  res.status(500).json({ error: err.message });
};
