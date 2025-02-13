export const HttpError = {
  INTERNAL: {
    status: 500,
    code: "INTERNAL",
  },
  BAD_REQUEST: {
    status: 400,
    code: "BAD_REQUEST",
  },
  CONFLICT: {
    status: 409,
    code: "CONFLICT",
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED",
  },
  FORBIDDEN: {
    status: 403,
    code: "FORBIDDEN",
  },
  LOGIN_TIME_OUT: {
    status: 401,
    code: "LOGIN_TIME_OUT",
  },
  NOT_FOUND: {
    status: 404,
    code: "NOT_FOUND",
  },
} as const satisfies Record<string, { code: string; status: number }>;

// eslint-disable-next-line ts/no-redeclare
export type HttpError = (typeof HttpError)[keyof typeof HttpError];

export const HttpOk = {
  OK: {
    status: 200,
    code: "OK",
  },
} as const satisfies Record<string, { code: string; status: number }>;

// eslint-disable-next-line ts/no-redeclare
export type HttpOk = (typeof HttpOk)[keyof typeof HttpOk];
