FROM oven/bun:1 as build
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile --prod
EXPOSE 3000
CMD ["bunx", "--bun", "nx", "start", "coursition", "--prod"]
