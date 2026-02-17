# Apodienste AI Management - Product and Engineering Requirements

## Core Stack (Mandatory)
- React + TypeScript
- Tailwind CSS
- Zustand (global client state)
- Component library approach: shadcn/ui style (reusable primitives)

## Confirmed Decisions
- Routing: `react-router-dom`
- Multilingual: EN + DE from day 1 (`i18next` + `react-i18next`)
- Forms: `react-hook-form` + `zod` + `@hookform/resolvers`
- Data fetching: `@tanstack/react-query` with typed `fetch` wrapper

## Authentication
- Microsoft Entra ID login
- Auto redirect to Microsoft login for unauthenticated users
- Return to app root after login
- Allowed user email: `amirbahman.mohammadpanah@pharmabits.eu`

## UI/UX Direction
- Colors inspired by apodienste branding (blue-first)
- First layout feature: Header + Sidebar + Main content
- Sidebar initial menu items:
  - Profiles
  - Prompts

## Architecture and Structure
- `src/app`: router, layout, providers
- `src/features/auth`: auth bootstrap, auth state, auth utilities
- `src/features/navigation`: sidebar/header UI
- `src/features/profiles`: profiles screen, query layer
- `src/features/prompts`: prompts screen, form module
- `src/shared/api`: API client and query utilities
- `src/shared/i18n`: translation setup/resources
- `src/shared/ui`: reusable UI primitives
- `src/shared/lib`: utility functions

## Quality Standards
- Strict TypeScript
- Reusable components over page-specific duplication
- Feature isolation and scalable module boundaries
- Stable patterns for adding future modules

## Phase 1 Scope (This implementation)
- Implement app shell (header/sidebar/main)
- Implement Profiles and Prompts routes/pages
- Implement EN/DE translation baseline
- Implement query baseline for profiles list (mock endpoint pattern)
- Implement prompt creation form with validation
- Keep auth flow active and enforced
