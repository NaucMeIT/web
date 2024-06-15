FROM oven/bun:1 as build
WORKDIR /app
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile
COPY . .
RUN bunx --bun nx build coursition --prod

FROM oven/bun:1 as release
WORKDIR /app
COPY --from=build /app/apps/coursition/.next/standalone .
COPY --from=build /app/apps/coursition/public ./apps/coursition/.next/static
COPY --from=build /app/apps/coursition/.next/static ./apps/coursition/.next/static
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "--bun", "apps/coursition/server.js"]
