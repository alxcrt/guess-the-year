FROM node:12-alpine

WORKDIR /app

# copy files and install dependencies
COPY . ./
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]