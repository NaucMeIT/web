# Coursition API

This is the consolidated API library for the Coursition application.

## Structure

The API is organized into modules:

- `auth` - Authentication endpoints and user management
- `dev` - Development and experimental endpoints
- `v1` - Version 1 stable API endpoints
- `utils` - Shared utility functions, error handling, and common middleware

## Usage

Import the complete API:

```typescript
import { typedBe } from '@nmit-coursition/api';
```

Or import specific modules:

```typescript
import { apiV1 } from '@nmit-coursition/api';
```

## Architecture

This API uses [Elysia.js](https://elysiajs.com/) to create a type-safe API with automatic documentation.
Each module is a separate Elysia instance that can be composed together.
