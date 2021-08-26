FROM node:14
ARG MONGO_URL
ENV MONGO_URL=$MONGO_URL
WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm ci
COPY ./src ./src
RUN npm run build
EXPOSE 5000
CMD npm start