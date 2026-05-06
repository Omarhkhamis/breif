import { ensureDatabaseReady, contentFiles } from "./database-bootstrap.js";
import { query } from "./db.js";

function normalizeRecord(row) {
  return [row.key, row.value];
}

export async function getSiteContent() {
  await ensureDatabaseReady();

  const rows = (
    await query(
      `
        SELECT key, value
        FROM site_content
        ORDER BY key ASC
      `,
    )
  ).rows;

  const content = Object.fromEntries(rows.map(normalizeRecord));

  for (const key of Object.keys(contentFiles)) {
    content[key] = content[key] ?? {};
  }

  return content;
}

export async function saveSiteContent(nextContent) {
  await ensureDatabaseReady();

  for (const key of Object.keys(contentFiles)) {
    if (!Object.hasOwn(nextContent, key)) {
      continue;
    }

    await query(
      `
        INSERT INTO site_content (key, value, updated_at)
        VALUES ($1, $2::jsonb, NOW())
        ON CONFLICT (key)
        DO UPDATE SET
          value = EXCLUDED.value,
          updated_at = NOW()
      `,
      [key, JSON.stringify(nextContent[key])],
    );
  }

  return getSiteContent();
}
