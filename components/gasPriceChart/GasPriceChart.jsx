import React, { useEffect, useRef } from "react"
import * as echarts from "echarts"

const GasPriceChart = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current)

    const options = {
      // tooltip: {
      //   trigger: "axis",
      //   position: function (pt) {
      //     return [pt[0], "10%"]
      //   }
      // },
      grid: {
        top: "0",
        bottom: "0",
        left: "5%",
        right: "5%"
      },
      title: {
        left: "center",
        // text: "Past 30 Days ETH Average Gas Price",
        padding: [40, 0, 0, 0]
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => item.date),
        show: false
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        min: 10000000000,
        show: false
      },
      series: [
        {
          name: "ETH Average Gas Price",
          type: "line",
          symbol: "none",
          itemStyle: {
            color: "#52b3d0"
          },
          //   areaStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: "#52b3d0" },
          //       { offset: 1, color: "#52b3d0" }
          //     ])
          //   },
          data: data.map((item) => item.gasPrice),
          markArea: {
            label: {
              color: "#57C5B6",
              fontSize: 16
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(255, 255, 255, 0.1)" }, // 开始颜色
                { offset: 1, color: "rgba(117, 195, 182, 0.2)" } // 结束颜色
              ])
            },
            data: [
              [
                {
                  name: "Coverage Scope",
                  yAxis: 30000000000 // 受保护区域的开始值
                },
                {
                  yAxis: 50000000000 // 受保护区域的结束值
                }
              ]
            ]
          }
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

export default GasPriceChart
