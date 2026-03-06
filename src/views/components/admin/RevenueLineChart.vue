<template >
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Hide the dataset legend
    },
    tooltip: {
        mode: 'index',
        intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        borderDash: [5, 5]
      },
      ticks: {
        // Custom formatting for currency on the y-axis
        callback: function(value) {
          return '₹' + value.toLocaleString();
        }
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>