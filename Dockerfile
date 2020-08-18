FROM node:12

WORKDIR /usr/src/app

EXPOSE 8080

COPY . .

RUN npm install

CMD ["npm", "start"]