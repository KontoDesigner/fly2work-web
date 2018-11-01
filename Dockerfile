FROM node:alpine
WORKDIR /tmp
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=0 /tmp/build/. /app/html/
WORKDIR /app

COPY nginx.conf /etc/nginx/
COPY start.sh .
RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]