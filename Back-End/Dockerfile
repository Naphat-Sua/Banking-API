FROM keymetrics/pm2:14-alpine

RUN apk add --no-cache tzdata
#COPY ./ /app   #Use volumes map in docker-compose.yml
WORKDIR /app
RUN chown -R node /app
USER node

#RUN npm install rimraf mongoose nestjs-command @nestjs/websockets @nestjs/platform-socket.io
#RUN npx @nestjs/cli
#RUN npm install --force
#RUN npm run build

CMD ["pm2-runtime","dist/main.js", "--log-date-format","YYYY-MM-DD HH:mm:ss Z"]
#CMD ["pm2-runtime","sleep infinity", "--log-date-format","YYYY-MM-DD HH:mm:ss Z"]

EXPOSE 3000
