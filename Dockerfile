FROM oven/bun:1.1.26 AS build

COPY --from=node:20 /usr/local/bin/node /usr/local/bin/node

COPY . /app
WORKDIR /app

# Add build arguments for environment variables
ARG GOOGLE_GENERATIVE_AI_API_KEY
ARG LLAMA_CLOUD_API_KEY
ARG OPENAI_API_KEY
ARG DEEPGRAM_API_KEY
ARG SUPPORT_EMAIL
ARG CERTBOT_DOMAIN
ARG CERTBOT_NAKED_DOMAIN

# Set environment variables
ENV GOOGLE_GENERATIVE_AI_API_KEY=$GOOGLE_GENERATIVE_AI_API_KEY
ENV LLAMA_CLOUD_API_KEY=$LLAMA_CLOUD_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV DEEPGRAM_API_KEY=$DEEPGRAM_API_KEY
ENV SUPPORT_EMAIL=$SUPPORT_EMAIL
ENV CERTBOT_DOMAIN=$CERTBOT_DOMAIN
ENV CERTBOT_NAKED_DOMAIN=$CERTBOT_NAKED_DOMAIN

RUN bun install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpx nx build coursition --prod --verbose

EXPOSE 3000

CMD ["bunx", "--bun", "nx", "start", "coursition", "--prod", "--verbose"]
