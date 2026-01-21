import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import SearchView from '@/view/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/search/:id',
      name: 'searchById',
      component: SearchView,
    },
    {
      path: '/team/:id',
      name: 'teamDetail',
      component: () => import('@/view/TeamView/_id.vue'),
    },

    {
      path: '/create-team',
      name: 'createTeam',
      component: () => import('@/view/CreateTeamView.vue'),
      children: [
        {
          path: '',
          name: 'createTeamName',
          component: () => import('@/view/CreateTeamView/NameView.vue'),
        },
        {
          path: 'add-pokemon',
          name: 'createTeamAddPokemon',
          component: () => import('@/view/CreateTeamView/AddPokemonView.vue'),
        },
        // {
        //   path: 'resume',
        //   name: 'createTeamResume',
        //   component: CreateTeamResumeView,
        // },
      ],
    },
  ],
})

export default router
