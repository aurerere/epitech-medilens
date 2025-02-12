import { getPnpmWorkspaces } from "workspace-tools";
import { config } from "dotenv";

const workspace = getPnpmWorkspaces(process.cwd()).filter(
  (ws) => ws.name === "@medilens/backend",
)[0];

if (workspace) {
  config({ path: `${workspace.path}/.env` });
}

export class Environment {
  static get(key: string) {
    const value = process.env[key];

    if (value === undefined) {
      throw new Error(`Environment variable '${key}' is missing`);
    }

    return value;
  }
}
