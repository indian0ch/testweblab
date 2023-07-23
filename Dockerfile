FROM node:18 as react

ARG API_URL=http://localhost:8000/api/v1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_URL $API_URL

RUN npm run build

FROM nginx:1.23.4

COPY --from=react /app/build /etc/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000


