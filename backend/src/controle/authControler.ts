import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database";
import { user } from "../modelos/user";

// cria um novo user no banco
export const register = async (req: Request, res: Response): Promise<void> => {
  const { user_name, user_email, user_password } = req.body;
  if (!user_name || !user_email || !user_password) {
    res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }
  // Usa um comando SQL para inserir o novo usuário no banco. Os ? evitam SQL injection, substituindo-os pelos valores fornecidos.
  try {
    const hashSenha = await bcrypt.hash(user_password, 10);

    await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user_name, user_email, hashSenha]
    );

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
    console.log("Erro no servido:", error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { user_email, user_password } = req.body;

  try {
    // Logando o email recebido na requisição
    console.log("Email recebido para login: ", user_email);

    // Consultando o banco de dados para o email
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [user_email]
    );
    
    // Verificando se o usuário foi encontrado
    const user = (rows as user[])[0];

    if (!user) {
      // Se não encontrar o usuário no banco de dados, retorna erro
      console.log(`Usuário não encontrado para o email: ${user_email}`);
      res.status(401).json({ error: "Credenciais inválidas (usuário não encontrado)" });
      return;
    }

    // Logando o usuário encontrado no banco (senha não exibida por questões de segurança)
    console.log(`Usuário encontrado: ${user.name} (${user.email})`);

    try {
      // Verificando se a senha está correta
      const isPasswordValid = await bcrypt.compare(user_password, user.password);

      if (!isPasswordValid) {
        // Se a senha não for válida, retorna erro
        console.log("Senha inválida fornecida para o usuário:", user_email);
        res.status(401).json({ error: "Credenciais inválidas (senha incorreta)" });
        return;
      }

      // Se as credenciais estiverem corretas, geramos o token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
      );

      console.log("Login bem-sucedido para o usuário:", user_email);
      res.status(200).json({ token });

    } catch (error) {
      // Caso haja algum erro na comparação da senha
      console.log("Erro ao comparar as senhas:", error);
      res.status(500).json({ error: "Erro ao comparar a senha" });
    }

  } catch (error) {
    // Captura qualquer erro na execução da consulta ao banco de dados
    console.log("Erro ao consultar o banco de dados:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
