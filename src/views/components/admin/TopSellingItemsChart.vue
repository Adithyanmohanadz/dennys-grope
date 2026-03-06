<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// Register Chart.js components required for a Bar Chart
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Ensures height prop works correctly
  indexAxis: 'y', // KEY: Makes the bar chart horizontal
  plugins: {
    legend: {
      display: false // We typically hide the legend for simple bar charts
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Units Sold',
        font: {
            size: 14
        }
      },
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
}
</script>