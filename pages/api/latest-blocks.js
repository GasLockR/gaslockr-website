import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default async function handler(req, res) {
  try {
    const query = `
        SELECT block_number, base_fee_per_gas
        FROM (
          SELECT block_number, base_fee_per_gas
          FROM gas_prices
          ORDER BY block_number DESC
          LIMIT 100
        ) AS latest_blocks
        ORDER BY block_number ASC;
      `
    const { rows } = await pool.query(query)
    res.status(200).json(rows)
  } catch (error) {
    console.error("Database query error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
