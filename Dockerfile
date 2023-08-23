FROM node:18-alpine
WORKDIR /nw-info
ENV REGISTRY https://registry.npmmirror.com
RUN ["npm", "install", "pnpm", "-g"]
RUN pnpm config set registry $REGISTRY

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --registry=$REGISTRY 
COPY . .