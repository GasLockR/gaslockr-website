import React from "react"
import CalendarHeatmap from "react-calendar-heatmap"
import ReactTooltip from "react-tooltip"
import "react-calendar-heatmap/dist/styles.css"
import styles from "./InsurancePayoutCalendar.module.css"

function InsurancePayoutCalendar({ payoutDates }) {
  const heatmapData = payoutDates.map((date) => ({
    date,
    count: 1
  }))

  return (
    <div>
      <div className="text-2xl mt-40 mb-10">Benefit Boost Calendar</div>
      <CalendarHeatmap
        startDate={new Date(new Date().getFullYear(), 0, 1)}
        endDate={new Date(new Date().getFullYear(), 11, 31)}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return styles.colorEmpty
          }
          return styles.colorFilled
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.count) {
            return null
          }
          return {
            "data-tip": `${value.date} had a Boost`
          }
        }}
      />
      <ReactTooltip />
    </div>
  )
}

export default InsurancePayoutCalendar
