import { Pool } from "pg";

function getPoolConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
    };
  }

  return {
    host: process.env.PGHOST ?? "/var/run/postgresql",
    port: Number(process.env.PGPORT ?? 5432),
    user: process.env.PGUSER ?? "omar",
    password: process.env.PGPASSWORD ?? "",
    database: process.env.PGDATABASE ?? "brief-db",
  };
}

function createPool() {
  return new Pool({
    ...getPoolConfig(),
    max: 10,
  });
}

const globalForDb = globalThis;

export const pool = globalForDb.__briefPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__briefPool = pool;
}

export async function query(text, params = []) {
  return pool.query(text, params);
}
