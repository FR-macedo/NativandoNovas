import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../database';
import { User } from '../modelos/usuario';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const hashSenha = await bcrypt.hash(password, 10);
    await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashSenha]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = (rows as User[])[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
