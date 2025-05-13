import { createRouter, createWebHistory } from 'vue-router'
import TheFormView from '@/views/The-Form-View.vue'
import NavMapView from '@/views/Nav-Map-View.vue'
import RecordsListView from '@/views/Records-List-View.vue'
import RecordDetailsView from '@/views/Record-Details-View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Form',
      component: TheFormView,
    },
    {
      path: '/Map',
      name: 'theMap',
      component: NavMapView,
    },
    {
      path: '/Records',
      name: 'Records',
      component: RecordsListView,
    },
    {
      path: '/Details',
      name: 'Details',
      component: RecordDetailsView,
    },
  ],
})

export default router
