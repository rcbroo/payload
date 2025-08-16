FROM node:20-alpine
WORKDIR /app
COPY services/owl-adapter/package.json services/owl-adapter/tsconfig.json /app/
RUN npm i -g pnpm && pnpm install
COPY services/owl-adapter/src /app/src
RUN pnpm build
ENV PORT=7010
EXPOSE 7010
CMD ["pnpm", "start"]
