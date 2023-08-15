import fs from "fs"
import path from "path"
import Papa from "papaparse"

export default function handler(req, res) {
  const csvFilePath = path.join(process.cwd(), "config/AvgGasPrice.csv")
  const csvFile = fs.readFileSync(csvFilePath, "utf8")

  const results = Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true
  })

  const filteredData = results.data.filter((record) => {
    const date = new Date(record["Date(UTC)"])
    return date >= new Date("2023-07-13") && date <= new Date("2023-08-13")
  })

  const responseData = filteredData.map((record) => {
    const date = new Date(record["Date(UTC)"])
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    return {
      date: formattedDate,
      gasPrice: record["Value (Wei)"]
    }
  })

  res.status(200).json(responseData)
}
