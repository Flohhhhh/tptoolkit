import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/unit-tests/**/*.test.ts"],
    environment: "node",
  },
});
