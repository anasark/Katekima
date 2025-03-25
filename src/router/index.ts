import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import TableDetailPage from "../views/TableDetailPage.vue";
import ListPage from "../views/ListPage.vue";
import DetailPage from "../views/DetailPage.vue";
import AddEditPage from "../views/AddEditPage.vue";

const routes = [
  { path: "/", name: 'Home', component: MainPage },
  { path: "/detail", name: 'Detail', component: DetailPage },
  { path: "/list-table", name: 'List Tabel', component: ListPage },
  { path: "/list-table/add", name: 'Add new data', component: AddEditPage },
  { path: "/list-table/edit/:id", name: 'Edit data', component: AddEditPage },
  { path: "/table-detail", name: 'Tabel Detail', component: TableDetailPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
