/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as example from "../example.js";
import type * as index from "../index.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  example: typeof example;
  index: typeof index;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  workflow: {
    functions: {
      start: FunctionReference<
        "mutation",
        "internal",
        {
          args: any;
          functionType:
            | { type: "query" }
            | { type: "mutation" }
            | { type: "action" };
          generationNumber: number;
          handle: string;
          journalId: string;
          workflowId: string;
        },
        null
      >;
    };
    journal: {
      load: FunctionReference<
        "query",
        "internal",
        { workflowId: string },
        Array<{
          _creationTime: number;
          _id: string;
          step:
            | {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType:
                  | { type: "query" }
                  | { type: "mutation" }
                  | { recoveryId?: string; type: "action" };
                handle: string;
                inProgress: boolean;
                outcome?:
                  | { result: any; resultSize: number; type: "success" }
                  | { error: string; type: "error" };
                startedAt: number;
                type: "function";
              }
            | {
                deadline: number;
                durationMs: number;
                inProgress: boolean;
                type: "sleep";
              };
          stepNumber: number;
          workflowId: string;
        }>
      >;
      pushEntry: FunctionReference<
        "mutation",
        "internal",
        {
          generationNumber: number;
          step:
            | {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType:
                  | { type: "query" }
                  | { type: "mutation" }
                  | { recoveryId?: string; type: "action" };
                handle: string;
                inProgress: boolean;
                outcome?:
                  | { result: any; resultSize: number; type: "success" }
                  | { error: string; type: "error" };
                startedAt: number;
                type: "function";
              }
            | {
                deadline: number;
                durationMs: number;
                inProgress: boolean;
                type: "sleep";
              };
          stepNumber: number;
          workflowId: string;
        },
        {
          _creationTime: number;
          _id: string;
          step:
            | {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType:
                  | { type: "query" }
                  | { type: "mutation" }
                  | { recoveryId?: string; type: "action" };
                handle: string;
                inProgress: boolean;
                outcome?:
                  | { result: any; resultSize: number; type: "success" }
                  | { error: string; type: "error" };
                startedAt: number;
                type: "function";
              }
            | {
                deadline: number;
                durationMs: number;
                inProgress: boolean;
                type: "sleep";
              };
          stepNumber: number;
          workflowId: string;
        }
      >;
    };
    sleep: {
      start: FunctionReference<
        "mutation",
        "internal",
        {
          durationMs: number;
          generationNumber: number;
          journalId: string;
          workflowId: string;
        },
        null
      >;
    };
    workflow: {
      blockedBy: FunctionReference<
        "query",
        "internal",
        { workflowId: string },
        {
          _creationTime: number;
          _id: string;
          step:
            | {
                args: any;
                argsSize: number;
                completedAt?: number;
                functionType:
                  | { type: "query" }
                  | { type: "mutation" }
                  | { recoveryId?: string; type: "action" };
                handle: string;
                inProgress: boolean;
                outcome?:
                  | { result: any; resultSize: number; type: "success" }
                  | { error: string; type: "error" };
                startedAt: number;
                type: "function";
              }
            | {
                deadline: number;
                durationMs: number;
                inProgress: boolean;
                type: "sleep";
              };
          stepNumber: number;
          workflowId: string;
        } | null
      >;
      cancel: FunctionReference<
        "mutation",
        "internal",
        { workflowId: string },
        null
      >;
      cleanup: FunctionReference<
        "mutation",
        "internal",
        { workflowId: string },
        boolean
      >;
      complete: FunctionReference<
        "mutation",
        "internal",
        {
          generationNumber: number;
          now: number;
          outcome:
            | { result: any; resultSize: number; type: "success" }
            | { error: string; type: "error" };
          workflowId: string;
        },
        null
      >;
      create: FunctionReference<
        "mutation",
        "internal",
        {
          logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR";
          workflowArgs: any;
          workflowHandle: string;
        },
        string
      >;
      load: FunctionReference<
        "query",
        "internal",
        { workflowId: string },
        {
          _creationTime: number;
          _id: string;
          args: any;
          generationNumber: number;
          logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR";
          startedAt: number;
          state:
            | { type: "running" }
            | {
                completedAt: number;
                outcome:
                  | { result: any; resultSize: number; type: "success" }
                  | { error: string; type: "error" };
                type: "completed";
              }
            | { canceledAt: number; type: "canceled" };
          workflowHandle: string;
        }
      >;
    };
  };
};
