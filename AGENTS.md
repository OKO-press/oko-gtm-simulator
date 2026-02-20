# GTM Simulator - AGENT Instructions

## Build/Lint/Test Commands

### Build
```bash
yarn build
```

### Lint
```bash
# Using TypeScript compiler for type checking
yarn run build
```

### Test
```bash
# Run tests (if any exist)
yarn test
```

### Development
```bash
# Start development server with hot reloading
yarn run dev

# Start production server
yarn start
```

## Code Style Guidelines

### Imports
- Use ES6 import syntax
- Prefer named imports over default imports
- Group imports by module type (standard library, external, internal)
- Import type-only when appropriate

### Formatting
- Use Prettier for consistent code formatting
- 2-space indentation
- Unix line endings (LF)
- No trailing spaces

### Types
- Use TypeScript with strict type checking
- Prefer interface over type for object shapes
- Use generics for reusable components
- Prefer readonly arrays and objects when appropriate

### Naming Conventions
- Variables and functions: camelCase
- Class names: PascalCase
- Constants: UPPER_SNAKE_CASE
- File names: kebab-case
- Module names: camelCase

### Error Handling
- Use try/catch blocks for asynchronous operations
- Prefer throwing typed errors
- Log errors before re-throwing
- Handle promise rejections properly

### Code Structure
- Keep functions small and focused
- Use descriptive variable and function names
- Export types from index files for clean imports
- Use JSDoc comments for all functions and exports
- Separation of concerns: API, business logic, data handling

### Project Structure
- `src/index.ts`: Main entry point
- `src/lib/`: Utility functions for logging, cleanup and file handling
- `src/lib/`:
  - `slugify.ts`: Convert strings to valid filenames
  - `create-json-file.ts`: Create JSON log files
  - `cleanup-directory.ts`: Clear old logs
- `log/`: Directory for JSON event logs (auto-generated)

### Environment
- Node.js (ES modules enabled via package.json "type": "module")
- TypeScript
- Hono framework for routing
- All files in `src` directory are written in TypeScript
- Uses tsx for development with hot reloading
