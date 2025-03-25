<script setup lang="ts">
import { useRouter } from "vue-router";
import DataTable from "../components/DataTable.vue";
import { getIdFromUrl } from "../utils/getIdFromUrl";

const router = useRouter();

const goToEdit = (url: string) => router.push(`list-table/edit/${getIdFromUrl(url)}`);
const deleteBerry = (url: string) => alert(`Hapus ${getIdFromUrl(url)}?`);
</script>

<template>
  <DataTable
    add-button="/list-table/add"
    :onEdit="goToEdit"
    :onDelete="deleteBerry"
  />
</template>
