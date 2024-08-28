FROM oven/bun:1.1.26 AS build
COPY --from=node:20 /usr/local/bin/node /usr/local/bin/node
COPY . /app
WORKDIR /app
RUN bun install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpx nx build coursition --prod --verbose
EXPOSE 3000
CMD ["bunx", "--bun", "nx", "start", "coursition", "--prod", "--verbose"]
