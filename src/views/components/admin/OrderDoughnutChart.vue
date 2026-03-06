<template>
  <div class="chart-wrapper" :style="{ width: '180px', height: '180px', position: 'relative' }">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div class="chart-center position-absolute top-50 start-50 translate-middle text-center">
      <span class="chart-total fs-4 fw-bold text-dark">{{ totalOrders }}</span>
      <span class="chart-label text-muted d-block">Orders</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const totalOrders = computed(() => {
  if (props.chartData.datasets && props.chartData.datasets[0]) {
    return props.chartData.datasets[0].data.reduce((sum, value) => sum + value, 0)
  }
  return 0
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%', // Controls the size of the hole (makes it a doughnut)
  plugins: {
    legend: {
      display: false // Hide Chart.js legend, we use a custom HTML legend
    },
    tooltip: {
      callbacks: {
        // Custom tooltip to show percentage
        label: (context) => {
          let label = context.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed !== null) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1) + '%';
            label += percentage;
          }
          return label;
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-center {
  pointer-events: none; /* Allows mouse events to pass through to the canvas */
}
</style>