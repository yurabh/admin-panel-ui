ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-bullseye-slim

RUN apt update && \
    apt upgrade -y && \
    apt install -y --no-install-recommends \
      dumb-init \
      curl \
      ca-certificates && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

ARG NPM_VERSION=latest
ENV NPM_VERSION=${NPM_VERSION}
RUN npm i -g npm@${NPM_VERSION}

WORKDIR /web

ARG APP_UID=10000
ARG APP_GID=10000
RUN usermod -u ${APP_UID} -g ${APP_GID} node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

USER node
ENTRYPOINT []
CMD []
