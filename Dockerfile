FROM node:14
WORKDIR /usr/app
COPY package.json .
RUN npm install tsc rimraf
RUN npm install --only=prod
COPY ./src ./src
RUN npm run build
EXPOSE 5000
CMD npm start