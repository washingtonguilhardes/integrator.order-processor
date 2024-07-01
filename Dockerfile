FROM node:20-alpine as deps

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

FROM node:20-alpine as builder

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules /usr/src/app/node_modules
COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV PORT 8080

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./package*.json
COPY --from=builder /usr/src/app/dist ./dist


EXPOSE $PORT
CMD [ "node", "dist/src/main.js" ]
