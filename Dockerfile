FROM node:16-alpine as development


WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm install
RUN npm run mcontainer:run

COPY src/ src/

RUN npm run build
RUN 

FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /app/dist/ ./dist/

# Expose application port
EXPOSE 3000

# Start application
CMD [ "node", "dist/main.js" ]