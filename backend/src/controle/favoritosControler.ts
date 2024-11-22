import { Request, Response } from 'express';
import pool from '../database';
import { User } from '../modelos/usuario';  // Importe a interface User

export const addFavorite = async (req: Request, res: Response) => {
  // Agora TypeScript sabe que req.user é do tipo User
  const { id: userId } = req.user!;  // Desestruturando userId do req.user

  const { item_id } = req.body;

  try {
    await pool.execute('INSERT INTO favorites (user_id, item_id) VALUES (?, ?)', [userId, item_id]);
    res.status(201).json({ message: 'Favorito adicionado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  // Agora TypeScript sabe que req.user é do tipo User
  const { id: userId } = req.user!;  // Desestruturando userId do req.user

  try {
    const [rows] = await pool.execute('SELECT * FROM favorites WHERE user_id = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};
