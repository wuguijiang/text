import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import MomentsView from '../views/MomentsView.vue'
import MusicView from '../views/MusicView.vue'

const routes = [
  {
    path: '/',
    name: 'About',
    component: AboutView
  },
  {
    path: '/about',
    name: 'AboutMe',
    component: AboutView
  },
  {
    path: '/experience',
    name: 'Experience',
    component: ExperienceView
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PortfolioView
  },
  {
    path: '/moments',
    name: 'Moments',
    component: MomentsView
  },
  {
    path: '/musics',
    name: 'Musics',
    component: MusicView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router