import { db } from "@/db"
import { Users } from "@/db/schema"
import { test, expect } from "@playwright/test"
import { eq } from "drizzle-orm"
import { extractLastCode, testUser } from "./utils"
import { readFileSync } from "fs"

test.describe("login Test", () => {
  test("Login", async ({ page }) => {
    await page.goto("/")
    await page.getByText("login").click()
    await page.getByLabel("Email").fill(testUser.email)
    await page.getByLabel("Password").fill(testUser.password)
    await page.getByLabel("submit-btn").click()
    await page.waitForURL("/dashboard")
    await page.getByText("Sign Out").click()
    await page.waitForURL("/")
  })
})
