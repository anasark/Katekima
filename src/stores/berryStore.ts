import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Berry } from "../types/Berry";
import type { BerryApiResponse } from "../types/BerryApiResponse";
import type { BerryDetails } from "../types/BerryDetails";

export const useBerryStore = defineStore("berry", () => {
  const berries = ref<Berry[]>([]);
  const next = ref<string | null>(null);
  const previous = ref<string | null>(null);
  const loading = ref(false);
  const url = 'https://pokeapi.co/api/v2/berry/';

  async function fetchBerries(limit: number = 10, offset: number = 0) {
    loading.value = true;
    try {
      const apiUrl = `${url}?limit=${limit}&offset=${offset}`;

      const response = await axios.get<BerryApiResponse>(apiUrl);
      berries.value = response.data.results;
      next.value = response.data.next;
      previous.value = response.data.previous;
    } finally {
      loading.value = false;
    }
  }

  async function fetchBerryDetails(id: number): Promise<BerryDetails> {
    loading.value = true;
    try {
      const response = await axios.get<BerryDetails>(`${url}${id}/`);
      return response.data;
    } finally {
      loading.value = false;
    }
  }

  return { berries, next, previous, loading, fetchBerries, fetchBerryDetails };
});
