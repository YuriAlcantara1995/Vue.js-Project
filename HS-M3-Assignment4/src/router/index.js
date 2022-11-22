import { createRouter, createWebHistory } from 'vue-router';

// Async loading of Views
const Home = () => import('../views/HomePage.vue');
const Nations = () => import('../views/NationListPage.vue');
const NationDetail = () => import('../views/NationDetailPage.vue')
const Players = () => import('../views/PlayerListPage.vue');


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/nations',
    name: 'nations',
    component: Nations,
  },
  {
    path: '/nations/:id',
    component: Nations,
    props: true,
    children: [
      { path: '', name: 'nation-detail', component: NationDetail },
    ],
  },
  {
    path: '/players',
    name: 'players',
    component: Players,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;