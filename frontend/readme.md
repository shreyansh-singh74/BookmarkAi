# React Project Structure

```text
src
|
+-- app/                      # app-level setup
|   +-- providers/            # global providers (theme, query, auth, etc.)
|   +-- router/               # router definitions
|   +-- App.tsx
|   +-- main.tsx              # entry file
|
+-- assets/                   # images, fonts, icons
|
+-- components/               # pure reusable UI components (buttons, inputs, cards)
|
+-- features/                 # feature-specific modules
|   +-- auth/
|   |    +-- components/
|   |    +-- hooks/
|   |    +-- services/
|   |    +-- types.ts
|   |
|   +-- dashboard/
|        +-- components/
|        +-- hooks/
|        +-- services/
|        +-- types.ts
|
+-- hooks/                    # shared hooks (useDebounce, useLocalStorage)
|
+-- lib/                      # preconfigured libs (axios client, query client)
|
+-- services/                 # global services (API handlers not tied to a single feature)
|
+-- stores/                   # global state (zustand, redux, jotai)
|
+-- utils/                    # general utility functions
|
+-- types/                    # global TypeScript types
|
+-- config/                   # env, constants, app configs
|
+-- styles/                   # global styles / tailwind config
|
+-- tests/                    # test utilities, mocks, helpers
```
