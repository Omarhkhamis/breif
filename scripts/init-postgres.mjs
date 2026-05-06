import { ensureDatabaseReady } from "../lib/database-bootstrap.js";
import { pool, query } from "../lib/db.js";

async function main() {
  await ensureDatabaseReady();

  const [{ contentCount }] = (
    await query("SELECT COUNT(*)::int AS \"contentCount\" FROM site_content")
  ).rows;
  const [{ adminsCount }] = (
    await query("SELECT COUNT(*)::int AS \"adminsCount\" FROM admins")
  ).rows;

  console.log(`Database ready: ${process.env.PGDATABASE ?? "brief-db"}`);
  console.log(`site_content rows: ${contentCount}`);
  console.log(`admins rows: ${adminsCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
