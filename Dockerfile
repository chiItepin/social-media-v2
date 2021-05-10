FROM node:12

RUN mkdir -p /usr/src/app/shareit
WORKDIR /usr/src/app/shareit

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]