FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --global nodemon

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build