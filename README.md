# Clinic Native App

React Native application built with Expo, React 18, and TypeScript.

## Tech Stack

- **React Native**: 0.81.5
- **Expo**: ~54.0.25
- **React**: 19.1.0
- **TypeScript**: ~5.9.2
- **Expo Router**: File-based routing
- **NativeWind**: Tailwind CSS for React Native
- **pnpm**: Package manager

## Project Structure

```
native/
├── app/                    # Expo Router routes
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab navigation
│   ├── introduction.tsx   # Onboarding flow
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-specific logic
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── constants/         # App constants and config
├── assets/                # Static assets
├── global.css             # Tailwind CSS styles
└── metro.config.js        # Metro bundler config
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Expo CLI (optional, can use npx)

### Installation

```bash
pnpm install
```

### Running the App

```bash
# Start development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Run on Web
pnpm web
```

## Code Quality

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm type-check
```

### Formatting

```bash
pnpm format
```

## Features

### Navigation

- **Home**: Daily overview, active training streaks, upcoming health tasks
- **Pets**: Pet profiles, health log, medical history, skin detection
- **Training**: Training center with modules and quick actions
- **Resources**: Safety guides and community links (YouTube, Discord)
- **Profile**: App settings, subscription management, account details

### Authentication Flow

1. Login/Register screens
2. Introduction/Onboarding for first-time users
3. Protected routes with tab navigation

## Development Guidelines

- Use kebab-case for all filenames (enforced by ESLint)
- Follow TypeScript strict mode conventions
- Use NativeWind for styling (Tailwind CSS classes)
- Follow conventional commit messages (enforced by commitlint)
- Pre-commit hooks run linting and type checking automatically

## Configuration

### ESLint

Configured with:
- TypeScript ESLint
- React Hooks linting
- React Native specific rules
- Unicorn plugin for filename enforcement

### Prettier

Shared configuration with PWA project for consistent formatting.

### Husky

Pre-commit hooks ensure code quality before commits.

