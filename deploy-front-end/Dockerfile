FROM node:latest as builder

EXPOSE 4200

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli@16.1.0

RUN npm ci --force

COPY . .

RUN npm run build

CMD ["ng", "serve", "--host=0.0.0.0"]