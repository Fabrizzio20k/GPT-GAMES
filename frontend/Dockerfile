# Usa la última versión de Node.js
FROM node:latest

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Establece la variable de entorno para desarrollo
ENV NODE_ENV=development

# Expone el puerto que la aplicación usará
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
