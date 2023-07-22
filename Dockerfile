FROM node:18 as react

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM webbylabhub/movies as backend

ARG API_URL
ENV REACT_APP_API_URL $API_URL

WORKDIR /app

COPY --from=react /app/build ./client


# Stage 2: Serve the React App using Nginx
FROM nginx:1.23.4

# Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the React stage to the nginx public folder
COPY --from=react /app/build /etc/nginx/html

# Copy your custom nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx listens on
EXPOSE 80

