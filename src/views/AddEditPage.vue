<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBerryStore } from "../stores/berryStore";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const store = useBerryStore();
const isEdit = ref(false);
const loading = ref(false);
const form = ref({ title: "", price: "" });

onMounted(async() => {
  if (route.params.id) {
    isEdit.value = true;
    loading.value = true;

    try {
      const details = await store.fetchBerryDetails(route.params.id);

      form.value.title = details.name;
      form.value.price = details.size;
    } catch (error) {
      console.error("Error fetching berry details:", error);
    } finally {
      loading.value = false;
    }
  }
});

const saveData = async () => {
  const url = "https://fakestoreapi.com/products";

  await axios.post(url, form.value);
  alert("Data berhasil disimpan!");
  router.push("/list-table");
};
</script>

<template>
  <div class="p-4">
    <form @submit.prevent="saveData" class="max-w-sm mx-auto">
      <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {{ isEdit ? "Edit" : "Tambah" }} Data
      </h2>

      <div class="mb-5">
        <label
          for="title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Title</label
        >
        <input
          type="text"
          v-model="form.title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="price"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Price</label
        >
        <input
          type="text"
          v-model="form.price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
