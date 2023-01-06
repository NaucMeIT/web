Welcome to our Github repository! This app is built with Next.js, Tailwind.css, pnpm, Prisma, and Supabase.

# Running the app

## Testing database

To run the app with testing database, follow these steps:

### Prerequisities

-   [Node.js](https://nodejs.org/en/)
-   [pnpm](https://pnpm.io/)

### Steps

1. Clone this repository to your local machine.
1. Navigate to the root directory of the project and run `pnpm install` to install the dependencies.
1. Set the environment variables in a `.env` file in the root directory. You can find a sample `.env.testing` file in the root directory.
1. Run `pnpm dev` to start the development server.
1. Open your browser and go to http://localhost:3000 to view the app.

## Local database

To run the app with local database, follow these steps:

### Prerequisities

-   [Node.js](https://nodejs.org/en/)
-   [pnpm](https://pnpm.io/)
-   [Docker](https://www.docker.com/)
-   Make sure your Docker is running

### Steps

1. Clone this repository to your local machine.
1. Navigate to the root directory of the project and run `pnpm install` to install the dependencies.
1. Set the environment variables in a `.env` file in the root directory. You can find a sample `.env.testing` file in the root directory.
1. Run `pnpm supabase start`.
1. Copy `DB URL` into `.env` file to the `DATABASE_URL` and remove the #.
1. Run `pnpm prisma migrate deploy`.
1. Run `pnpm prisma db seed`.
1. Run `pnpm dev` to start the development server.
1. Open your browser and go to http://localhost:3000 to view the app.
