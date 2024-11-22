import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modelos/usuario';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new Error('Token de autenticação é necessário'));  // Usando next() com erro
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return next(new Error('Token inválido'));  // Passando erro para next()
    }

    // Atribui a propriedade user com o tipo User
    req.user = user as User;

    next();  // Chama o próximo middleware ou a função de rota
  });
};
