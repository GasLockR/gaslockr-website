// pages/api/getLeaderboardData.js
import fs from "fs"
import path from "path"
import Papa from "papaparse"

const filePath = path.join(process.cwd(), "config", "V1_Points_By_Address.csv")

const readCsvData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject(err)
      }
      const parsedData = Papa.parse(data, { header: true }).data
      resolve(parsedData)
    })
  })
}

export default async function handler(req, res) {
  try {
    const { page = 0, pageSize = 100, searchTerm = "" } = req.query

    const data = await readCsvData()
    const filteredData = data.filter(
      (row) =>
        row.From && row.From.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalRows = data.length
    const filteredTotalRows = filteredData.length
    const totalPages = Math.ceil(filteredTotalRows / pageSize)
    const start = page * pageSize
    const end = start + parseInt(pageSize)

    const paginatedData = filteredData.slice(start, end).map((row) => ({
      rank: row.rank,
      formattedAddress: `${row.From.slice(0, 6)}...${row.From.slice(-4)}`,
      points: row.points_rounded
    }))

    res.status(200).json({
      data: paginatedData,
      totalRows,
      filteredTotalRows,
      totalPages
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
