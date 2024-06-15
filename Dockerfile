# Use the official Bun image
FROM oven/bun:1 as base

# Set the working directory
WORKDIR /app

# Cache and install dependencies in a temp directory
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the application using Nx
FROM install AS build
COPY . .
RUN bunx --bun nx build coursition --prod

# Prepare the final image with only the necessary files
FROM install AS release
COPY --from=build /app/apps/coursition/.next/standalone /
COPY --from=build /app/apps/coursition/public ./public

# Set environment variable
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Command to run the application using server.js file
CMD ["ls", "./"]
# CMD ["bun", "--bun", "apps/coursition/server.js"]
# CMD ["bunx", "--bun", "nx", "start", "coursition", "--prod", "--verbose"]
