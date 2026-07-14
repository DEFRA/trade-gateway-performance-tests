FROM grafana/k6:2.1.0

ENV TZ="Europe/London"

USER root

RUN apk add --no-cache \
  aws-cli \
  curl \
  nodejs \
  npm

USER k6

WORKDIR /k6

COPY . .

RUN npm ci
RUN npm run format:check
RUN npm run lint

ENTRYPOINT [ "./scripts/entrypoint.sh" ]
