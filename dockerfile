
FROM node:18-alpine AS builder
WORKDIR /usr/src/wiki

RUN apk add --no-cache gettext

COPY . .

RUN yarn install --frozen-lockfile \
 && yarn build

FROM node:18-alpine
WORKDIR /usr/src/wiki

RUN apk add --no-cache gettext

COPY --from=builder /usr/src/wiki/ .

ENTRYPOINT [ "sh", "-c", \
  "envsubst < /usr/src/wiki/config.template.yml > /usr/src/wiki/config.yml && node /usr/src/wiki/server/index.js" \
]
