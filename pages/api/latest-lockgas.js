import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default async function handler(req, res) {
  try {
    const query = `
      SELECT blocknumber, lockgas
      FROM lock_gas
      ORDER BY blocknumber DESC
      LIMIT 1;
    `
    const { rows } = await pool.query(query)
    if (rows.length > 0) {
      res.status(200).json(rows[0])
    } else {
      res.status(404).json({ error: "No data found" })
    }
  } catch (error) {
    console.error("Database query error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
