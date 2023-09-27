# This is the node lts as of Sep. 26, 2023
FROM node:18.18.0
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ARG REACT_APP_API_HOST
RUN test -n "$REACT_APP_API_HOST"
ENV REACT_APP_API_HOST $REACT_APP_API_HOST

COPY . .
EXPOSE 3000

RUN npm run build
RUN npm install -g serve

CMD [ "serve", "-s", "build" ]
