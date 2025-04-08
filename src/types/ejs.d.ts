declare module "ejs" {
  export function render(
    template: string,
    data?: Record<string, any>,
    options?: Record<string, any>
  ): string

  export function renderFile(
    path: string,
    data?: Record<string, any>,
    options?: Record<string, any>,
    callback?: (err: Error | null, str: string) => void
  ): Promise<string>

  export function compile(
    template: string,
    options?: Record<string, any>
  ): (data?: Record<string, any>) => string

  export function compileFile(
    path: string,
    options?: Record<string, any>
  ): (data?: Record<string, any>) => string
}
