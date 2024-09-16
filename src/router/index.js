import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import UserCreateEdit from "@/views/users/UserCreateEdit.vue";

// import Employees from "@/views/branch/components/Employees.vue";

import BlankPage from "@/components/BlankPage.vue";
import Employees from "@/views/profile/Employees.vue";
import UserProfile from "@/views/profile/UserProfile.vue";

const routes = [
  {
    name:'register',
    path: '/register',
    component: RegisterView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: 'User Registration',
    },
  },
  {
    name:'login',
    path: '/',
    component: LoginView,
    meta: {
      slug: 'Login',
    },
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component: TheDashboardView,
    requiresAuth: true,
    meta: {
      slug: 'Dashboard',
    },
    children : [
        {
          name: 'invoice',
          path: 'invoice',
          component: Employees,
          requiresAuth: true,
          meta: {
            slug: 'Invoices',
          },
        },
        {
          name: 'blank',
          path: 'blank',
          component: BlankPage,
          requiresAuth: true,
          meta: {
            slug: 'Blank Page',
          },
        },
        {
          name: 'profile',
          path: 'profile',
          component: UserProfile,
          requiresAuth: true,
          meta: {
            slug: 'Profile',
          },
        },
      ]

  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;