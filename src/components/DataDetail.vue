<script setup lang="ts">
import type { BerryDetails } from "../types/BerryDetails";
import SkeletonTable from "../components/Skeleton/DetailTable.vue";

const props = defineProps<{
  berry: BerryDetails | null;
  loading: boolean;
}>();
</script>

<template>
  <div v-if="props.loading">
    <SkeletonTable />
  </div>
  <div v-else>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 w-1/2">Field</th>
          <th scope="col" class="px-6 py-3 w-1/2">Value</th>
        </tr>
      </thead>
      <tbody v-if="props.berry">
        <tr
          v-for="(value, key) in props.berry"
          :key="key"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">{{ key }}</td>
          <td class="px-6 py-4">
            <template v-if="key === 'flavors'">
              <ul>
                <li v-for="(item, index) in value as any[]" :key="index">
                  <a :href="item.flavor.url" class="underline underline-offset-2 cursor-pointer">
                    {{ item.flavor.name }}
                  </a>
                  : {{ item.potency }}
                </li>
              </ul>
            </template>
            <template v-else-if="typeof value === 'object' && value !== null">
              <a
                v-if="'url' in value && 'name' in value"
                class="underline underline-offset-2 cursor-pointer"
                :href="value.url"
              >
                {{ value.name }}
              </a>
            </template>
            <template v-else>
              {{ value }}
            </template>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td colspan="2" class="px-6 py-30 text-center">No data</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

