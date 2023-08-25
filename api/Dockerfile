FROM node:18-alpine

WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY . ./src
RUN npm install
RUN npm run build

EXPOSE 4000
CMD ["npm", "start"]