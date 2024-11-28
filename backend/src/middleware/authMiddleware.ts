import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "../modelos/user";

// Middleware de autenticação de token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extrai o token da autorização no header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // Se não encontrar o token, retorna erro
    return next(new Error("Token de autenticação é necessário"));
  }

  try {
    // Verifica o token usando a chave secreta
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedUser) => {
      if (err) {
        // Se houver erro na verificação do token, retorna erro
        return next(new Error("Token inválido"));
      }

      // Atribui o usuário decodificado ao req.user com o tipo correto
      req.user = decodedUser as user;

      // Chama o próximo middleware ou a função da rota
      next();
    });
  } catch (error) {
    // Se ocorrer erro em qualquer parte do processo, retorna erro genérico
    next(new Error("Erro na autenticação do token"));
  }
};
