import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const supportedEnvironments = ['staging', 'uat', 'production'] as const;
type TestEnvironment = (typeof supportedEnvironments)[number];

const G = globalThis as any;
const selectedEnvironment = (G.process?.env?.TEST_ENV ?? G.TEST_ENV ?? 'staging').toLowerCase();

if (!supportedEnvironments.includes(selectedEnvironment as TestEnvironment)) {
  throw new Error(
    `TEST_ENV "${selectedEnvironment}" tidak valid. Gunakan: ${supportedEnvironments.join(', ')}.`,
  );
}

const envFile = resolve((G.process?.cwd?.() ?? ''), `.env.${selectedEnvironment}`);

if (!existsSync(envFile)) {
  throw new Error(`File environment tidak ditemukan: ${envFile}`);
}

for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
  const trimmedLine = line.trim();

  if (!trimmedLine || trimmedLine.startsWith('#')) continue;

  const separatorIndex = trimmedLine.indexOf('=');
  if (separatorIndex === -1) continue;

  const key = trimmedLine.slice(0, separatorIndex).trim();
  const value = trimmedLine.slice(separatorIndex + 1).trim();
  G.process ? (G.process.env[key] ??= value) : (G[key] ??= value);
}

function requiredValue(key: 'BASE_URL' | 'EMAIL' | 'PASSWORD'): string {
  const value = G.process ? G.process.env[key] : G[key];

  if (!value) {
    throw new Error(`${key} wajib diisi di .env.${selectedEnvironment}`);
  }

  return value;
}

export class Environment {
  static readonly name = selectedEnvironment as TestEnvironment;
  static readonly baseUrl = requiredValue('BASE_URL').replace(/\/$/, '');
  static readonly email = requiredValue('EMAIL');
  static readonly password = requiredValue('PASSWORD');
}
