import React, { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"

const GasChart = () => {
  const chartRef = useRef(null)
  const [chartInstance, setChartInstance] = useState(null)
  const [latestBlockNumber, setLatestBlockNumber] = useState(0)
  const [dataSeries, setDataSeries] = useState([])
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false) // 新状态标记初始数据是否加载完成

  const fetchInitialData = async () => {
    try {
      const response = await fetch("/api/latest-blocks")
      const data = await response.json()
      const formattedData = data.map((item) => ({
        blockNumber: item.block_number,
        gasPrice: parseFloat(item.base_fee_per_gas)
      }))
      setDataSeries(formattedData)
      if (data.length > 0) {
        setLatestBlockNumber(data[data.length - 1].block_number)
      }
      setIsInitialDataLoaded(true) // 设置初始数据加载完成
    } catch (error) {
      console.error("Failed to fetch initial gas data:", error)
    }
  }

  const fetchGasPrices = async () => {
    if (!isInitialDataLoaded) return // 如果初始数据未加载完成，不执行新数据的检查
    try {
      const response = await fetch(
        "https://api.blocknative.com/gasprices/blockprices",
        { method: "GET" }
      )
      const { blockPrices } = await response.json()
      if (
        blockPrices.length > 0 &&
        blockPrices[0].blockNumber > latestBlockNumber
      ) {
        const newBlock = blockPrices[0]
        const newData = {
          blockNumber: newBlock.blockNumber,
          gasPrice: newBlock.baseFeePerGas
        }
        setDataSeries((currentData) => {
          const updatedData = [...currentData, newData]
          return updatedData.slice(-100) // 保持最新的100条数据
        })
        setLatestBlockNumber(newBlock.blockNumber)
      }
    } catch (error) {
      console.error("Error fetching gas prices:", error)
    }
  }

  useEffect(() => {
    if (chartRef.current && !chartInstance) {
      const initializedChart = echarts.init(chartRef.current)
      setChartInstance(initializedChart)
    }
  }, [])

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (isInitialDataLoaded) {
      // 只有在初始数据加载后，才设置定时器
      const intervalId = setInterval(fetchGasPrices, 500) // 调整为每500毫秒检查一次新数据
      return () => clearInterval(intervalId)
    }
  }, [isInitialDataLoaded, latestBlockNumber])

  useEffect(() => {
    if (chartInstance && dataSeries.length > 0) {
      const option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            const param = params[0]
            return `Block Number: ${param.axisValue}<br>Base Fee: ${param.data[1]}`
          }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            margin: 15 // 调整这个值来改变 Y 轴标签与图表内容的距离
          },
          axisTick: {
            show: false // 不显示 X 轴的刻度线
          },
          data: dataSeries.map((item) => item.blockNumber.toString())
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#f1f5f9", // 设置分割线颜色为黄色
              type: "dashed" // 设置分割线为虚线
            }
          },
          axisLabel: {
            margin: 20 // 调整这个值来改变 Y 轴标签与图表内容的距离
          }
        },
        series: [
          {
            data: dataSeries.map((item) => [
              item.blockNumber.toString(),
              item.gasPrice
            ]),
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                color: "#57c5b6" // 设置数据展示区域的背景色
              }
            }
          }
        ]
      }
      chartInstance.setOption(option, true) // 使用true确保完全覆盖之前的配置
    }
  }, [dataSeries, chartInstance])

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>
}

export default GasChart
