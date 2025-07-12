FROM node:18-alpine AS deps
WORKDIR /usr/src/wiki
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /usr/src/wiki
COPY --from=deps /usr/src/wiki/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:18-alpine
WORKDIR /usr/src/wiki

ARG DATA_PATH=/usr/src/wiki/data
ENV NODE_ENV=production \
    DATA_PATH=${DATA_PATH}

COPY --from=builder /usr/src/wiki ./

RUN mkdir -p ${DATA_PATH} \
  && addgroup -S appuser \
  && adduser -S appuser -G appuser \
  && chown -R appuser:appuser /usr/src/wiki
USER appuser

EXPOSE 3000
CMD ["node", "server"]
