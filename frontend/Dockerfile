# Use uma imagem Node.js oficial como base
FROM node:18-alpine

# Instala dependências do Expo
RUN npm install -g expo-cli

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código fonte
COPY . .

# Porta para o Expo
EXPOSE 19000 19001 19002

# Comando para iniciar o Expo
CMD ["npm", "start", "--", "--reset-cache"]