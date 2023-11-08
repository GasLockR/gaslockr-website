import React, { useEffect, useRef } from "react"
import * as echarts from "echarts"

const IncomeChart = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)

    const dateList = data.map((item) => item[0])
    const valueList = data.map((item) => item[1])

    const options = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"]
        }
      },
      grid: {
        top: "10%",
        bottom: "20%",
        left: "10%",
        right: "10%"
      },
      title: {
        left: "center",
        text: "Income Over Time",
        padding: [20, 0, 0, 0]
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dateList,
        show: true,
        axisTick: {
          show: true
        },
        axisLine: {
          show: true
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        show: true,
        axisTick: {
          show: true
        },
        axisLine: {
          show: true
        },
        splitLine: {
          show: true
        }
      },
      series: [
        {
          name: "Income",
          type: "line",
          symbol: "none",
          itemStyle: {
            color: "#52b3d0"
          },
          data: valueList
        }
      ]
    }

    chartInstance.setOption(options)

    return () => {
      chartInstance.dispose()
    }
  }, [data])

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>
}

export default IncomeChart
