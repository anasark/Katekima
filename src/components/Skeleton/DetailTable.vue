<template>
  <div class="animate-pulse">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 w-1/2">Field</th>
          <th scope="col" class="px-6 py-3 w-1/2">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 5" :key="n" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </td>
          <td class="px-6 py-4">
            <div class="h-4 bg-gray-300 rounded w-full"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
