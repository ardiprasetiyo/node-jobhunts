import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CVBuilder from '../views/CVBuilder.vue'
import CV from '../views/CV.vue'
import ComingSoon from '../views/ComingSoon.vue'
import Funding from "../views/Funding.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cv-builder',
    name: 'CV Builder',
    component: CVBuilder
  },
  {
    path: '/coming-soon',
    name: "Coming Soon",
    component: ComingSoon
  },
  {
    path: '/funding',
    name: "Funding",
    component: Funding
  },
  {
    path: '/cv/:cvId',
    name: "CV",
    component: CV
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
