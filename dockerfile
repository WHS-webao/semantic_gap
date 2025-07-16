# ── 1) 소스 클론 & 빌드 스테이지 ────────────────────────
FROM node:18-alpine AS builder
WORKDIR /usr/src/wiki

# git도 설치
RUN apk add --no-cache gettext git

# 공식 저장소에서 원하는 릴리스 태그 체크아웃
RUN git clone https://github.com/Requarks/wiki.git . \
  && git checkout v2.5.307

# 의존성 설치 + 프로덕션 빌드
RUN yarn install --frozen-lockfile \
 && yarn build

# ── 2) 런타임 스테이지 ──────────────────────────────────
FROM node:18-alpine
WORKDIR /usr/src/wiki

RUN apk add --no-cache gettext

# 빌드된 파일들만 복사
COPY --from=builder /usr/src/wiki/ .

# 프로덕션 모드로 설정하고 기동
ENV NODE_ENV=production
ENTRYPOINT [ "sh", "-c", \
  "envsubst < config.template.yml > config.yml && node server/index.js" \
]
