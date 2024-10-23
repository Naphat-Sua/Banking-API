FROM node:14-alpine
RUN apk update
RUN apk add nginx
#COPY ./ /app
WORKDIR /app

COPY nginx.conf /etc/nginx/nginx.conf

#RUN npm install
#CMD ["sh","-c","npm run build && nginx -g 'daemon off;'"]
CMD ["sh","-c","nginx -g 'daemon off;'"]

EXPOSE 80
