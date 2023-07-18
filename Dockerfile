FROM webbylabhub/movies

WORKDIR '/app'

COPY package*.json ./

RUN npm install

COPY . .

ENV API_URL=http://localhost:8000/api/v1

EXPOSE 8000

CMD ["npm", "start"]