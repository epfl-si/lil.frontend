FROM node:20

RUN npm install -g serve

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

RUN npm run build

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

CMD ["/bin/sh", "./docker-entrypoint.sh"]
