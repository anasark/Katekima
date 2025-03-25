<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useBerryStore } from "../stores/berryStore";
import { useRouter } from "vue-router";
import { useClickOutside } from "../utils/useClickOutside";
import SkeletonTable from "../components/Skeleton/ListTable.vue";

const props = defineProps<{
  addButton?: string;
  onEdit?: (item: string) => void;
  onDelete?: (item: string) => void;
  onDetail?: (item: string) => void;
}>();

const store = useBerryStore();
const router = useRouter();
const search = ref("");
const selectedLimit = ref(10);
const offsetParam = ref(0);
const isDropdownPerPageOpen = ref(false);

interface DropdownPerPageOption {
  value: number;
  label: string;
}

const dropdownOptions: DropdownPerPageOption[] = [
  { value: 10, label: "10" },
  { value: 30, label: "30" },
  { value: 50, label: "50" },
];

const updateUrlParams = () => {
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.set('search', search.value);
  currentParams.set('limit', selectedLimit.value.toString());
  currentParams.set('offset', offsetParam.value.toString());

  router.replace({ query: Object.fromEntries(currentParams) });
};

const toggleDropdown = () => {
  isDropdownPerPageOpen.value = !isDropdownPerPageOpen.value;
};

const closeDropdown = () => {
  isDropdownPerPageOpen.value = false;
};

useClickOutside(closeDropdown, ['#dropdownRadioButton', '#dropdownRadio']);

const selectLimit = (limit: number) => {
  selectedLimit.value = limit;
  offsetParam.value = 0;
  isDropdownPerPageOpen.value = false;
  updateUrlParams(); 
};

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  search.value = params.get('search') || "";
  selectedLimit.value = Number(params.get('limit')) || 10;
  offsetParam.value = Number(params.get('offset')) || 0;

  store.fetchBerries(selectedLimit.value, offsetParam.value);
});

watch(selectedLimit, (newLimit) => {
  store.fetchBerries(newLimit, offsetParam.value);
  updateUrlParams();
});

watch(search, () => {
  updateUrlParams();
});

const filteredBerries = computed(() =>
  store.berries.filter((b) =>
    b.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const sortByName = () => {
  store.berries.sort((a, b) => a.name.localeCompare(b.name));
};

const fetchNext = async () => {
  if (store.next) {
    let offset: number | undefined;
    const offsetString: string | null = store.next ? new URLSearchParams(store.next.split('?')[1]).get('offset') : null;

    if (offsetString !== null) {
      offset = parseInt(offsetString, 10);
    }
    offsetParam.value = offset !== undefined ? offset : 0;
    await store.fetchBerries(selectedLimit.value, offset);
    updateUrlParams(); 
  }
};

const fetchPrevious = async () => {
  if (store.previous) {
    let offset: number | undefined;
    const offsetString: string | null = store.previous ? new URLSearchParams(store.previous.split('?')[1]).get('offset') : null;

    if (offsetString !== null) {
      offset = parseInt(offsetString, 10);
    }
    offsetParam.value = offset !== undefined ? offset : 0;
    await store.fetchBerries(selectedLimit.value, offset);
    updateUrlParams(); 
  }
};

const getIdFromUrl = (url: string): number | null => {
  const regex = /\/(\d+)\//; 
  const match = url.match(regex);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  return null;
}
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div v-if="props.addButton" class="flex justify-end">
      <router-link :to="props.addButton" class="inline-flex items-center bg-rose-500 hover:bg-rose-600 border border-rose-300 cursor-pointer text-white px-3 py-1.5 mb-4 text-sm rounded-lg">Tambah</router-link>
    </div>
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <!-- Dropdown menu -->
      <div style="position: relative;">
        <button
          id="dropdownRadioButton"
          @click="toggleDropdown"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Last {{ selectedLimit }} days
          <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <!-- Dropdown menu option -->
        <div 
          id="dropdownRadio" 
          v-show="isDropdownPerPageOpen"
          class="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
          style="position: absolute;  margin: 0px;"
        >
          <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
            <li v-for="option in dropdownOptions" :key="option.value">
              <div class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id="filter-radio-example-{{ option.value }}"
                  type="radio"
                  :value="option.value"
                  name="filter-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="selectedLimit"
                  @change="selectLimit(option.value)"
                />
                <label :for="'filter-radio-example-' + option.value" class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300">
                  {{ option.label }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <!-- end Dropdown menu option -->
      </div>
      <!-- end Dropdown menu -->
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
          v-model="search"
        />
      </div>
    </div>

    <div v-if="store.loading">
      <SkeletonTable />
    </div>
    <div v-else>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center" @click="sortByName">
                Nama
                <a href="#">
                  <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody v-if="filteredBerries.length">
          <tr v-for="(berry, index) in filteredBerries" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ getIdFromUrl(berry.url) }}</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ berry.name }}
            </th>
            <td class="px-6 py-4">
              <a
                v-if="props.onDetail"
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="props.onDetail(berry.url)"
              >
                Detail
              </a>
              <a
                v-if="props.onEdit"
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="props.onEdit(berry.url)"
              >
                Edit
              </a>
              <a
                v-if="props.onDelete"
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                @click="props.onDelete(berry.url)"
              >
                Delete
              </a>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td colspan="3" class="px-6 py-30 text-center">No data</td>
          </tr>
        </tbody>
      </table>
      <nav class="flex items-center justify-end pt-4" aria-label="Table navigation">
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              @click="fetchPrevious" 
              :disabled="store.previous == null" 
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="fetchNext" 
              :disabled ="store.next == null" 
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
