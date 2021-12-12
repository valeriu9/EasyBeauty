FROM node:14

ARG BUILD_ENV

RUN mkdir -p /usr/src/app
COPY package*.json /usr/src/app/
RUN cd /usr/src/app/; npm install
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm run build

CMD [ "npm", "run", "start" ]
