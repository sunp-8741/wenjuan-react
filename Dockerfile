FROM node:16-alpine as builder

ENV PROJECT_ENV production
ENV NODE_ENV production

# http-server 不变动也可以利用缓存
WORKDIR /code

ADD package.json /code
RUN npm config set registry https://registry.npm.taobao.org/ && yarn

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:1.22.1
COPY --from=builder /code/public /usr/share/nginx/html
