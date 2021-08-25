FROM node:latest

# Buat direktori aplikasi di dalam docker
WORKDIR /usr/src/path
# WORKDIR /app

# Menyalin dependencies aplikasi kedalam docker 
COPY package*.json ./
# COPY package.json ./

# Instalasi dependencies
RUN npm install

# Menyalin file aplikasi
copy . .

# define port
EXPOSE 3000

# menjalankan aplikasi kita
# CMD ["node","index.js"]
CMD ["npm","start"]