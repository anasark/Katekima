<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useBerryStore } from "../stores/berryStore";
import type { Berry } from "../types/Berry";
import type { BerryDetails } from "../types/BerryDetails";
import { useClickOutside } from "../utils/useClickOutside";
import DataDetail from "../components/DataDetail.vue";

const store = useBerryStore();
const selectedBerry = ref(0);
const selectedBerryName = ref<string | null>(null);
const detail = ref<BerryDetails | null>(null);
const isDropdownOpen = ref(false);
const loading = ref(false);
const search = ref("");

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

useClickOutside(closeDropdown, ['#dropdownRadioButton', '#dropdownSearch']);

const fetchDetail = async () => {
  if (!selectedBerry.value) return;

  loading.value = true;
  try {
    detail.value = await store.fetchBerryDetails(selectedBerry.value);
  } catch (error) {
    console.error("Error fetching berry details:", error);
  } finally {
    loading.value = false;
  }
};

const setSelectedBerry = (berry: Berry) => {
  selectedBerryName.value = berry.name;
  const id = getIdFromUrl(berry.url);

  if (!id) return;

  selectedBerry.value = id;
  toggleDropdown();
}

const getIdFromUrl = (url: string): number | null => {
  const regex = /\/(\d+)\//; 
  const match = url.match(regex);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  return null;
}

onMounted(() => {
  store.fetchBerries(70, 0);
});

const filteredBerries = computed(() =>
  store.berries.filter((b) =>
    b.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div
      class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
    >
      <!-- Dropdown menu -->
      <div style="position: relative">
        <button
          id="dropdownRadioButton"
          @click="toggleDropdown"
          class="inline-flex items-center min-w-[240px] text-gray-500 bg-white border border-gray-300 focus:outline-none cursor-pointer hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          <div class="text-center w-full">
            {{ selectedBerryName || '-- Select --' }}
          </div>
        </button>

        <button @click="fetchDetail" class="ml-3 inline-flex items-center bg-blue-500 hover:bg-blue-600 border border-blue-300 cursor-pointer text-white px-3 py-1.5 text-sm rounded-lg">Pindah</button>
        <!-- Dropdown menu option -->
        <div
          id="dropdownSearch"
          v-show="isDropdownOpen"
          class="z-10 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700"
          style="position: absolute;  margin: 0px;"
        >
          <div class="p-3">
            <label for="input-group-search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search user"
                v-model="search"
              />
            </div>
          </div>
          <ul
            class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            <template v-for="(berry) in filteredBerries" :key="berry.name">
              <li>
                <div
                  class="flex items-center cursor-pointer ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="setSelectedBerry(berry)"
                >
                  <label
                    for="checkbox-item-11"
                    class="w-full py-2 cursor-pointer ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                  >
                    {{ berry.name }}
                  </label>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <!-- end Dropdown menu option -->
      </div>
      <!-- end Dropdown menu -->
    </div>

    <DataDetail
      :berry="detail"
      :loading="loading"
    />
  </div>
</template>
