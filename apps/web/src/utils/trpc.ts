import {
	createTRPCReact,
	inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "service";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();
