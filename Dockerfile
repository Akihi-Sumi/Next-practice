FROM node:17

EXPOSE 3000
ENV HOST 0.0.0.0

RUN yarn global add create-next-app