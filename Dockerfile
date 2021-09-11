FROM node:14
ARG MONGO_URL
ENV MONGO_URL=$MONGO_URL
WORKDIR /usr/app
COPY ./package.json .
RUN npm install --only=prod