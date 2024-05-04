# first stage
FROM node:20-alpine3.18 as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD /app/node_modules/.bin/ng serve --host 0.0.0.0 

