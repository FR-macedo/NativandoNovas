// src/express.d.ts
import { User } from './models/usuario'; // ajuste o caminho conforme necessário

declare global {
  namespace Express {
    export interface Request {
      user?: User; // ou o tipo específico que você deseja para `user`
    }
  }
}
