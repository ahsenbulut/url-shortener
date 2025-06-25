const pool = require('../config/database');

async function saveUrl(originalUrl, shortCode) {
  const result = await pool.query(
    `INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *`,
    [originalUrl, shortCode]
  );
  return result.rows[0];
}

async function findUrlByCode(shortCode) {
  const result = await pool.query(
    `SELECT * FROM urls WHERE short_code = $1`,
    [shortCode]
  );
  return result.rows[0];
}

async function incrementClickCount(shortCode) {
  await pool.query(
    `UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1`,
    [shortCode]
  );
}



module.exports = {
  saveUrl,
  findUrlByCode,
  incrementClickCount,
};
