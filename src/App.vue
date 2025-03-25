<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import { useClickOutside } from "./utils/useClickOutside";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeDropdown = () => {
  isSidebarOpen.value = false;
};

useClickOutside(closeDropdown, ['#sidebar-menu', '#sidebar-menu-button']);

const breadcrumbs = ref<{ name: string; url: string; }[]>([
  { name: "Home", url: "/" },
]);

const getBreadcrumbName = (segment: string): string => {
  return segment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const updateBreadcrumbs = (newBreadcrumbs: { name: string; url: string; }[]) => {
  breadcrumbs.value = [{ name: "Home", url: "/" }, ...newBreadcrumbs];
};

const route = useRoute();

watch(route, (newRoute) => {
  const pathSegments = newRoute.path.split("/").filter(segment => segment);
  const newBreadcrumbs: { name: string; url: string; }[] = [];

  pathSegments.forEach((segment, index) => {
    const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const name = getBreadcrumbName(segment);

    newBreadcrumbs.push({ name, url: fullPath });
  });

  updateBreadcrumbs(newBreadcrumbs);
});
</script>

<template>
  <div class="">
    <!-- navbar -->
    <Navbar :toggleSidebar="toggleSidebar" />
    <!-- end navbar -->

    <!-- sidebar -->
    <Sidebar :isOpen="isSidebarOpen" />
    <!-- end sidebar -->

    <!-- main -->
    <div class="p-4 sm:ml-64 mt-[57px]">
      <Breadcrumb :items="breadcrumbs" />
      <RouterView class="mt-6"/>
    </div>
    <!-- end main -->
  </div>
</template>
