FROM node:18-alpine

# Instalar Java necessário para o ClojureScript
RUN apk add --no-cache openjdk11-jre

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json shadow-cljs.edn ./

# Instalar dependências
RUN npm install && test -d node_modules

# Copiar código fonte
COPY . .

# Expor portas para desenvolvimento
EXPOSE 3000 9630 8080

# Comando padrão
CMD ["npm", "start"]
