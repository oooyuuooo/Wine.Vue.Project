import { createRouter, createWebHistory } from 'vue-router'
import wineWebRouter from './WineWebRouter'
const totalRouter = wineWebRouter
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: totalRouter
})

export default router
