<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps(['isOpen']);
const route = useRoute();

const isActive = (path: string) => {
  return route.path.startsWith(path);
};
</script>

<template>
  <aside id="sidebar-menu" :class="['fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700', isOpen ? 'translate-x-0' : '-translate-x-full']" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <router-link 
            to="/list-table" 
            class="flex items-center p-2 rounded-lg dark:text-white group" 
            :class="{ 'bg-gray-100 dark:bg-gray-700': isActive('/list-table') }" 
            active-class="bg-gray-100 dark:bg-gray-700" 
          >
            <svg 
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
            <span class="ms-3">List Tabel</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/detail" 
            class="flex items-center p-2 rounded-lg dark:text-white group" 
            active-class="bg-gray-100 dark:bg-gray-700" 
          >
            <svg 
              class="w-6 h-6 text-gray-800 dark:text-white" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 21 21"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
            </svg>
            <span class="ms-3">Detail</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
