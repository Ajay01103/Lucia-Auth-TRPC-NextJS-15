import { z } from "zod"
import { publicProcedure, createTRPCRouter } from "../init"
import { userRouter } from "./user"
export const appRouter = createTRPCRouter({
  user: userRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
