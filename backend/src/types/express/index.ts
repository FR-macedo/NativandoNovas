// src/types/express/index.d.ts

import { user } from "../../modelos/user"; // Importando o tipo do usuário (ajuste o caminho conforme necessário)

declare global {
  namespace Express {
    interface Request {
      user?: user; // Definindo a propriedade 'user' como opcional (pode ser null ou undefined)
    }
  }
}
