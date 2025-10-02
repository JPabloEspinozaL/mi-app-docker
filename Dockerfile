# Usa una imagen oficial de Node.js como base
FROM node:20

# Habilita Corepack para poder usar Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración del proyecto
COPY package.json yarn.lock .yarnrc.yml ./

# Instala las dependencias del proyecto con Yarn
RUN yarn install --immutable

# Copia el resto de los archivos del proyecto (como server.js)
COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible
EXPOSE 3000

# Comando que se ejecutará para iniciar la aplicación
CMD ["yarn", "start"]