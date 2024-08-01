FROM node:20.15.0-alpine as builder
WORKDIR /app
COPY package.json .
ENV PATH ./node_modules/.bin:$PATH

RUN npm install
RUN npm run build

FROM nginx:latest
VOLUME ./nginx
RUN rm -rf /etc/nginx/conf.d
COPY ./nginx/conf /etc/nginx
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]