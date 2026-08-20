FROM node:16-alpine

RUN apk add --no-cache curl

WORKDIR /app

# copy files and install dependencies
COPY . ./
RUN npm install
RUN npm run build

CMD ["node", "build"]