FROM node:14.21.3-bullseye AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit

COPY . .
RUN npm run build:app

FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/leaflet-x-legacy /usr/share/nginx/html

EXPOSE 80
