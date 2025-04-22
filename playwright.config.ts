import { defineConfig, devices } from "@playwright/test"
import "dotenv/config"

const baseUrl = `http://localhost:3000`

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/e2e/output",
  timeout: 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    baseURL: baseUrl,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "bun dev",
    url: baseUrl,
    stdout: "pipe",
    stderr: "pipe",
    reuseExistingServer: !process.env.CI,
  },
})
