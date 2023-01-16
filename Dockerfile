FROM node:18-alpine

COPY . /app/

WORKDIR /app

RUN npm i

RUN npm run build

CMD [ "node", "/app/dist/main.js" ]
