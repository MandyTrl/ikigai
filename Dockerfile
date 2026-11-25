FROM node:24-slim

WORKDIR /usr/local/app
COPY . ./

RUN yarn
RUN yarn build

EXPOSE 3000 
CMD ["yarn", "start"]
