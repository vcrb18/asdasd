# ECG Frontend

This repository contains the frontend code for the ECG project. It uses pnpm as the package manager. The project is written in TypeScript and uses Vite as the build tool. It has been configured to use ESLint for static code analysis and Prettier for code formatting. The project uses React and MUI for the user interface. And it also uses Vitest for testing.

## Requirements
- Node.js (version 16 or higher)
## Installation

To get started with the ECG Frontend, follow these steps:

1. Clone the repository to your local machine.
2. Make sure you have pnpm installed globally. If not, you can install it by running `npm install -g pnpm`.
3. Navigate to the project directory and run `pnpm install` to install the project dependencies.

## Usage

The package.json file includes several scripts that can be used to develop, build, and test the project.

- `dev`: Runs the development server using Vite. This script automatically compiles and bundles the code and starts a local development server. It is used during development to provide a hot-reload development experience.
- `build`: Builds the project for production. This script runs the TypeScript compiler (`tsc`) to compile the code and then uses Vite to create an optimized build. The output is generated in the `dist` directory.
- `prepare`: Runs 'husky install,' it automatically sets up pre-commit and pre-push hooks in your Git repository. 
- `format`: Formats the source code using Prettier. This script runs Prettier to automatically format all TypeScript and TypeScript JSX files in the `src` directory.
- `lint`: Runs ESLint to perform static code analysis on the source code. It checks for TypeScript and TypeScript JSX files in the `src` directory, reporting any linting errors and warnings.
- `preview`: Starts a local server to preview the production build. This script is useful to test the built project locally before deployment.
- `test`: Runs the test suite using Vitest. This script executes the test cases defined in the project.