from node:latest as frontend

RUN mkdir -p /frontend
WORKDIR /frontend

RUN yarn config set "strict-ssl" false -g

CMD ["yarn", "start"]
