FROM node:20

RUN npm install -g serve

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]