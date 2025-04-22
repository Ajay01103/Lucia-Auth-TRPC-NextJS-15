export const testUser = {
  name: "testuser",
  email: "user@test.com",
  password: "xyzabc",
}

export function extractLastCode(log: string): string | null {
  // Regular expression to match the code value
  const regex = /"code":"(\d+)"/g

  let match: RegExpExecArray | null
  let lastCode: string | null = null

  // Find all matches and keep track of the last one
  while ((match = regex.exec(log)) !== null) {
    lastCode = match[1] ?? null
  }
  return lastCode
}
