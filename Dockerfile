FROM oven/bun:1.1.26 AS build
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile --prod
RUN bunx nx build coursition --prod --verbose
EXPOSE 3000
CMD ["bunx", "--bun", "nx", "start", "coursition", "--prod", "--verbose"]
