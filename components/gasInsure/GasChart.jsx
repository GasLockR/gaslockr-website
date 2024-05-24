import React, { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const GasChart = () => {
  const chartRef = useRef(null)
  const [chartInstance, setChartInstance] = useState(null)
  const [latestBlockNumber, setLatestBlockNumber] = useState(0)
  const [dataSeries, setDataSeries] = useState([])
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [lockGas, setLockGas] = useState(null)

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
      setIsInitialDataLoaded(true)
    } catch (error) {
      console.error("Failed to fetch initial gas data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLockGas = async () => {
    try {
      const response = await fetch("/api/latest-lockgas")
      const data = await response.json()
      setLockGas(parseFloat(data.lockgas).toFixed(6))
    } catch (error) {
      console.error("Failed to fetch lockgas data:", error)
    }
  }

  const fetchGasPrices = async () => {
    if (!isInitialDataLoaded) return
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
          return updatedData.slice(-300)
        })
        setLatestBlockNumber(newBlock.blockNumber)
      }
    } catch (error) {
      console.error("Error fetching gas prices:", error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      chartInstance && chartInstance.resize()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [chartInstance])

  useEffect(() => {
    if (!chartInstance && chartRef.current) {
      const initializedChart = echarts.init(chartRef.current)
      setChartInstance(initializedChart)
    }
  }, [chartInstance, chartRef])

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (isInitialDataLoaded) {
      const intervalId = setInterval(fetchLockGas, 10000) // 每10秒更新一次lockgas
      return () => clearInterval(intervalId)
    }
  }, [isInitialDataLoaded])

  useEffect(() => {
    if (isInitialDataLoaded) {
      const intervalId = setInterval(fetchGasPrices, 3000)
      return () => clearInterval(intervalId)
    }
  }, [isInitialDataLoaded, latestBlockNumber])

  useEffect(() => {
    if (chartInstance && dataSeries.length > 0) {
      const maxGasPrice = Math.max(...dataSeries.map((item) => item.gasPrice))
      const yAxisMax = lockGas ? Math.max(maxGasPrice, lockGas) : maxGasPrice

      const option = {
        title: {
          text: "Recent Gas Prices",
          left: "10%",
          top: "top",
          textStyle: {
            color: "#159895",
            fontSize: 18,
            fontWeight: "bold"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          },
          formatter: function (params) {
            const param = params[0]
            return `Block Number: ${param.axisValue}<br>Base Fee: ${param.data[1]}`
          }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            margin: 15
          },
          axisTick: {
            show: false
          },
          data: dataSeries.map((item) => item.blockNumber.toString())
        },
        yAxis: {
          type: "value",
          max: yAxisMax,
          splitLine: {
            show: false
          },
          axisLabel: {
            margin: 20
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
            lineStyle: {
              color: "#57c5b6"
            },
            areaStyle: {
              normal: {
                color: "#57c5b6"
              }
            },
            markLine: lockGas
              ? {
                  data: [
                    {
                      yAxis: lockGas,
                      label: {
                        show: true,
                        formatter: `Threshold: ${lockGas}`,
                        color: "#159895",
                        position: "insideEndTop",
                        padding: [3, 5],
                        borderRadius: 4
                      },
                      lineStyle: {
                        color: "#159895",
                        width: 2
                      }
                    }
                  ],
                  symbol: ["none", "none"]
                }
              : {}
          }
        ]
      }
      chartInstance.setOption(option, false)
    }
  }, [dataSeries, chartInstance, lockGas])

  return (
    <Card className="w-full h-full flex items-center justify-center border-2 border-[#159895] relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
          <Loader2 className="animate-spin h-10 w-10 text-[#159895]" />
        </div>
      )}
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px",
          overflow: "hidden",
          opacity: isLoading ? 0.5 : 1,
          filter: isLoading ? "blur(4px)" : "none",
          transition: "opacity 0.3s, filter 0.3s"
        }}
      ></div>
    </Card>
  )
}

export default GasChart
