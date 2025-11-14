import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'), 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('../views/PokemonsView.vue'),
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritosView.vue'),
    },
    {
      path: '/pokemons/:nombre',
      name: 'poke',
      component: () => import('../views/PokeView.vue'),
    },
    {
      path: '/pokemons/PokeNotFound',
      name: 'PokeNotFound',
      component: () => import('../views/PokeNotFountView.vue'),
    },
    {
      path: '/pokemons/ability/:habilidad',
      name: 'habilidad',
      component: () => import('../views/HabilidadView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
})

export default router
