// src/types/express/index.d.ts

import { User } from '../../modelos/usuario'; // Importando o tipo do usuário (ajuste o caminho conforme necessário)

declare global {
  namespace Express {
    interface Request {
      user?: User; // Definindo a propriedade 'user' como opcional (pode ser null ou undefined)
    }
  }
}
