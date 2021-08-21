FROM node:14
WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm ci
COPY ./src ./src
RUN npm run build
EXPOSE 5000
CMD npm start