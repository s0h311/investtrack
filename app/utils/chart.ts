import { Chart } from 'chart.js/auto'

type ChartConfig = {
  id?: string
  xAxisLabels: string[]
  data: number[]
}

type PieChartConfig = {
  id?: string
  labels: string[]
  data: number[]
}

const charts = new Map<string, Chart>()

export function destroyChart(id: string): void {
  const chart = charts.get(id)

  if (chart) {
    chart.destroy()
  }
}

export function initLineChart(canvas: HTMLCanvasElement, { id, xAxisLabels, data }: ChartConfig): void {
  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: xAxisLabels,
      datasets: [
        {
          label: '',
          data,
          borderColor: '#50C683',
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: Math.floor(Math.min(...data) * 0.9),
          max: Math.floor(Math.max(...data) * 1.1),
          ticks: {
            precision: 0,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })

  if (id) {
    charts.set(id, chart)
  }
}

export function initPieChart(canvas: HTMLCanvasElement, { id, labels, data }: PieChartConfig): void {
  const chart = new Chart(canvas, {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          data,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          // display: false,
        },
      },
    },
  })

  if (id) {
    charts.set(id, chart)
  }
}

export function initBarChart(canvas: HTMLCanvasElement, { xAxisLabels, data }: ChartConfig): void {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: xAxisLabels,
      datasets: [
        {
          label: '',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: Math.ceil(Math.max(...data) * 1.1),
          ticks: {
            precision: 0,
          },
        },
      },
    },
  })
}
