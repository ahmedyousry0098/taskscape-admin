FROM node:18.13.0 

WORKDIR /adminapp

COPY package.json .

RUN npm install

COPY . .

RUN npm i -g typescript

EXPOSE 3000

CMD [ "npm", "start" ]