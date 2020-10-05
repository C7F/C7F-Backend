FROM node:lts-buster-slim as build

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-buster-slim

WORKDIR /app

COPY . .
COPY --from=build /app/dist ./dist

# Install only production dependencies for smaller image
RUN npm install --only=production

ENTRYPOINT ["npm", "start"]
