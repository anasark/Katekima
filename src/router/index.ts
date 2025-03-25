import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import ListPage from "../views/ListPage.vue";
import DetailPage from "../views/DetailPage.vue";
import AddEditPage from "../views/AddEditPage.vue";

const routes = [
  { path: "/", name: 'Home', component: Main },
  { path: "/list-table", name: 'List Tabel', component: ListPage },
  { path: "/detail", name: 'Detail', component: DetailPage },
  { path: "/list-table/add", name: 'Add new data', component: AddEditPage },
  { path: "/list-table/edit/:id", name: 'Edit data', component: AddEditPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
