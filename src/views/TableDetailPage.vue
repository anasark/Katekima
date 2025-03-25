<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useBerryStore } from "../stores/berryStore";
import { useRouter } from "vue-router";
import type { BerryDetails } from "../types/BerryDetails";
import { getIdFromUrl } from "../utils/getIdFromUrl";
import DataTable from "../components/DataTable.vue";
import Modal from "../components/Modal.vue";
import DataDetail from "../components/DataDetail.vue";

const store = useBerryStore();
const router = useRouter();
const id = ref<number | null>(null);
const loading = ref<boolean>(false);
const detail = ref<BerryDetails | null>(null);

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  id.value = Number(params.get('id')) || null;

  if (id.value === null) {
    return;
  }

  getDetail(id.value);
});

const updateUrlParams = () => {
  const currentParams = new URLSearchParams(window.location.search);

  if (id.value !== null) {
    currentParams.set('id', id.value.toString());
  } else {
    currentParams.delete('id');
  }

  router.replace({ query: Object.fromEntries(currentParams) });
};

const closeModal = () => {
  detail.value = null;
  id.value = null;
  updateUrlParams();
};

const getDetail = async (idBerry: number) => {
  id.value = idBerry;
  loading.value = true;
  updateUrlParams();

  try {
    detail.value = await store.fetchBerryDetails(idBerry);
  } catch (error) {
    console.error("Error fetching berry details:", error);
  } finally {
    loading.value = false;
  }
};

const showDetail = async (url: string) => {
  const idBerry = getIdFromUrl(url) || null;
  if (idBerry === null) {
    console.error("Failed get ID");
    return;
  }  

  getDetail(idBerry);
};
</script>

<template>
  <DataTable :onDetail="showDetail" class="mt-5"/>
  <Modal
    :showModal="detail != null"
    modalTitle="Mukidi"
    :closeModal="closeModal"
  >
    <DataDetail :berry="detail" :loading="loading" />
  </Modal>
</template>
