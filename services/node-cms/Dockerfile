FROM node:20-alpine
WORKDIR /app
COPY services/node-cms/package.json services/node-cms/tsconfig.json /app/
RUN npm i -g pnpm && pnpm install
COPY services/node-cms/src /app/src
COPY proto /app/proto
RUN pnpm build
ENV PORT=50051
EXPOSE 50051
CMD ["pnpm", "start"]
