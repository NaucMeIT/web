FROM oven/bun:1.1.26 AS build
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile --prod
RUN bunx --bun nx reset
RUN bunx --bun nx build coursition --prod
EXPOSE 3000
CMD ["bunx", "--bun", "nx", "start", "coursition", "--prod", "--verbose"]
