import { createRouter, createWebHistory } from 'vue-router'

import Resources from '../pages/Resources.vue'


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [

        {
            path: '/resources',
            name: 'resources',
            component: Resources,
        },

    ],
})

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = () => {
//         return localStorage.getItem('authToken') === 'authenticated'
//     }

//     if (to.meta.requiresAuth && !isAuthenticated()) {
//         next({ name: 'login' })
//     } else if (to.name === 'login' && isAuthenticated()) {
//         next({ name: 'home/users' })
//     } else {
//         next()
//     }
// })

export default router
