FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npx", "nodemon", "--legacy-watch", "src/server.js"]