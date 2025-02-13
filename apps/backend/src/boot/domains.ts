import { bootUser } from "../domains/user/boot";

export function bootDomains() {
  const { loginHandler, registerHandler, authenticationHandler } = bootUser();

  return { loginHandler, registerHandler, authenticationHandler };
}
