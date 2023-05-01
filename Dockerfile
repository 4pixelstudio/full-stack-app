FROM node:18-alpine
ENV NODE_ENV development

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]