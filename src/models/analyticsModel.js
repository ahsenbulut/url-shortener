const pool = require('../config/database');

async function logClick({ url_id, ip, userAgent, referer, country, city }) {
  await pool.query(
    `INSERT INTO analytics (url_id, ip_address, user_agent, referer, country, city) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [url_id, ip, userAgent, referer, country, city]
  );
}

module.exports = {
  logClick,
};
