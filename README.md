# Education Monorepo

Welcome to our project! This document will guide you through setting up your development environment and getting started with our monorepo architecture. We've designed our setup process to be straightforward and consistent across team members, prioritizing reproducible development environments.

## Technology Stack

Our project utilizes a modern JavaScript/TypeScript development stack:

- **[Nx](http://nx.dev/)**: Our monorepo management tool that helps us maintain multiple projects in a single repository.
- **[Bun](https://bun.sh/)**: A fast all-in-one JavaScript runtime and toolchain.
- **[PNPM](http://pnpm.io/)**: Our package manager, configured with workspaces for optimal monorepo dependency management.
- **[Proto](https://moonrepo.dev/proto)** (recommended): A unified tool manager that ensures consistent development environments.

## Development Environment Setup

We recommend using Proto for managing development tools, as it ensures consistent development environments across the team. Proto will automatically handle the installation and management of all required tools based on our project configuration.

### Recommended Setup with Proto

1. Install Proto by following the official installation guide:
   [Proto Installation Guide](https://moonrepo.dev/docs/proto/install)

2. Initialize your development environment:
   ```bash
   proto use
   ```
   This command will automatically install all necessary dependencies specified in `.prototools`, including the correct versions of Node.js, Bun, and PNPM.

3. Install project dependencies:
   ```bash
   pnpm install
   ```

4. To upgrade tooling when necessary:
   ```bash
   proto upgrade
   proto use
   ```

### Alternative Manual Setup

If you choose not to use Proto, you'll need to manually install the required tools. Check the versions specified in `.prototools` for:

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)
- [PNPM](http://pnpm.io/)

After installing the required tools, run `pnpm install` in the project root.

> **Note**: For platform-specific installation details, refer to the respective tool documentation.

## Project Structure

Our monorepo is organized into two main directories:

```
├── apps/    # Application projects - standalone deployable applications
├── libs/    # Shared libraries - reusable code consumed by apps
├── nx.json  # Nx configuration
└── pnpm-workspace.yaml # PNPM workspace configuration
```

To visualize the project structure and dependencies, use:
```bash
bunx nx show project [PROJECT] --web
```

## Working with the Monorepo

We use Nx to manage our monorepo, which provides powerful tools for building and testing our applications.

### Command Structure
```bash
bunx nx run [PROJECT]:[COMMAND]
```

### Commond commands

To start the development server for backend:
```bash
bunx nx run backend:dev
```

To build a project:
```bash
bunx nx run backend:build
```

If you need to run one command (e.g. typecheck) over more projects use:
```bash
bunx nx run-many --target=typecheck --all
```

Need more detailed output? Add the `--verbose` flag:
```bash
bunx nx run backend:dev --verbose
```

## Troubleshooting

If you encounter any issues during setup:

1. Ensure all prerequisites are properly installed:
   - If using Proto, verify it's correctly installed and try running `proto use` again.
   - For manual setup, check that your tool versions match those in `.prototools`.

2. Try cleaning and reinstalling dependencies:
   - Remove the `node_modules` directory.
   - Delete the PNPM lock file.
   - Run `pnpm install` again.

3. For Nx command issues:
   - Use the `--verbose` flag to get detailed output.
   - Ensure you're running commands from the project root.
   - Verify the project name is correct.

4. Check common environment issues:
   - Ensure you have sufficient disk space.
   - Verify you have necessary permissions.
   - Address conflicting global installations.

## License

This project is licensed under the Fair Source License (FSL). See [LICENSE.md](LICENSE.md) for details.
