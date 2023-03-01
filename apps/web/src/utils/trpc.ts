import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "service";

export const trpc = createTRPCReact<AppRouter>();
