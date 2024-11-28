# Use uma imagem Node.js oficial como base
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Porta que a aplicação vai rodar
EXPOSE 3002

# Comando para iniciar a aplicação
CMD ["npm", "start"]