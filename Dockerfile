FROM node:16-alpine as build-step

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN apk add --update git
RUN npm install -g @angular/cli@13.1.4
RUN npm install
RUN npm run build
RUN npm audit fix --force

ENTRYPOINT ["ng","serve","--host", "0.0.0.0", "--port", "4201"]
