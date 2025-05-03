# pdf-uploader/Dockerfile

# Stage 1: build the React app
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
# copy built static files
COPY --from=build /app/build /usr/share/nginx/html
# copy your nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]