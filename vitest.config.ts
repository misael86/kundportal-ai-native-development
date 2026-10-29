import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    css: true,
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
    coverage: {
      provider: "v8",
      include: [
        "src/shared/ui/**/*.{ts,tsx}",
        "src/features/issues/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.stories.tsx",
        "**/*.spec.md",
        "**/*.test.tsx",
        "src/features/issues/stories/**",
      ],
    },
  },
});
