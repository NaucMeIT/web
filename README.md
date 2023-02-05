# Nauč mě IT

[![MIT](https://img.shields.io/github/license/pegak/nauc-me-it)](https://github.com/pegak/nauc-me-it/blob/master/LICENSE)
![Vercel](https://vercelbadge.vercel.app/api/pegak/nauc-me-it)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fnaucme.it)](https://naucme.it)
![Contributors](https://img.shields.io/github/contributors/pegak/nauc-me-it)

[![Discord](https://img.shields.io/discord/996169548845830394?color=7389D8&label&logo=discord&logoColor=ffffff&style=for-the-badge)](https://discord.gg/QbYswwYUPU)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/NaucMeIT)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/nauc-me-it/)

Welcome to our Github repository! This app is built with Next.js, Tailwind.css, pnpm, Prisma, and Supabase.

## Running the app

### Testing database

To run the app with testing database, follow these steps:

#### Prerequisities

-   [Volta](https://volta.sh/) - we use Volta, install guide [here](https://docs.volta.sh/guide/getting-started), **it handles Node.js and pnpm versions**.
-   [Node.js](https://nodejs.org/en/) - please install it with Volta, we always use latest version.
-   [pnpm](https://pnpm.io/) - please follow [this guide](https://pnpm.io/installation) to install pnpm (**it is different from npm shipped with Node.js**), optionally you can use Volta, but pnpm support is [experimental](https://docs.volta.sh/advanced/pnpm).

#### Steps

1. Clone this repository to your local machine.
1. Navigate to the root directory of the project and run `pnpm install` to install the dependencies.
1. Create the environment variables in a `.env` file in the root directory. You can find an example in `.env.testing` file in the root directory, it has almost all variables except SendGrid, so emails won't work locally. To get the key download `.env` file from [Pastebin](https://pastebin.com/093He0QT) with password `BpYwfi4ngg`.
1. Run `pnpm dev` to start the development server.
1. Open your browser and go to http://localhost:3000 to view the app.

### Local database

To run the app with local database, follow these steps:

#### Prerequisities

-   [Node.js](https://nodejs.org/en/) - you can install it from [here](https://nodejs.org/en/download/), we always use latest version.
-   [pnpm](https://pnpm.io/) - please follow [this guide](https://pnpm.io/installation) to install pnpm (**it is different from npm shipped with Node.js**)
-   [Docker](https://www.docker.com/) - please follow [this guide](https://docs.docker.com/get-docker/) to install Docker
-   Make sure your Docker is running

#### Steps

1. Clone this repository to your local machine.
1. Navigate to the root directory of the project and run `pnpm install` to install the dependencies.
1. Create the environment variables in a `.env` file in the root directory. You can find an example in `.env.testing` file in the root directory, it has almost all variables except SendGrid, so emails won't work locally. To get the key download `.env` file from [Pastebin](https://pastebin.com/093He0QT) with password `BpYwfi4ngg`.
1. Run `pnpm supabase start`.
1. Copy `DB URL` into `.env` file to the `DATABASE_URL` and remove the #.
1. Run `pnpm prisma migrate deploy` or `npx prisma migrate deploy`.
1. Run `pnpm prisma db seed` or `npx prisma db seed`.
1. Run `pnpm dev` to start the development server.
1. Open your browser and go to http://localhost:3000 to view the app.
