import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/login',
      name: 'login',

      component: () => import('../views/Login.vue'),
    },
    {
      path: '/account',
      name: 'account',

      component: () => import('../views/Account.vue'),
    },
    {
      path: '/user',
      name: 'user',

      component: () => import('../views/UserD.vue'),
       meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/admin',
      name: 'admin',

      component: () => import('../views/Admin.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/post',
      name: 'post',

      component: () => import('../views/AdminPost.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/admingoods',
      name: 'admingoods',

      component: () => import('../views/AdminInventoey.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }

    },
    {
      path:'/allproduct',
      name:'allproduct',

      component: () => import('../views/AllProduct.vue'),
    },
    {
      path: '/products/:id',
      name: 'ProductInfo',
      component: () => import('../views/ProductInfo.vue'),
      props: true
    },

    {
      path: "/user/products/:id",
      name: "UserProductInfo",
      component: () => import("../views/ProductInfo.vue"),
      props: true
    },

    {
      path: "/checkout/:id",
      name: "Checkout",
      component: () => import("../views/Checkout.vue"),

      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    }

  ],
})

//  Protect routes based on local storage session
// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem('user') || 'null');
  
//   if (to.path === '/admin' && (!user || !user.is_admin)) {
//     next('/'); // take non-admins back to login
//   } else if (to.path === '/user' && (!user || user.is_admin)) {
//     next('/'); // take admins out of user view
//   } else {
//     next();
//   }
  
// });
export default router
