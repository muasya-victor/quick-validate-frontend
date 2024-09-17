import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import UserCreateEdit from "@/views/users/UserCreateEdit.vue";

// import Employees from "@/views/branch/components/Employees.vue";

import BlankPage from "@/components/BlankPage.vue";
import Employees from "@/views/profile/Employees.vue";
import UserProfile from "@/views/profile/UserProfile.vue";
import ProductSettingsForm from "@/views/kra/KraSetup.vue";
import SettingsView from "@/views/settings/SettingsView.vue";
import RegisterForm from "@/views/auth/forms/RegisterForm.vue";
import QuickBookAuthenticationForm from "@/views/auth/QuickBookAuthenticationForm.vue";
import KraSetup from "@/views/kra/KraSetup.vue";
import InvoiceList from "@/views/invoices/InvoiceList.vue";

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
          name: 'invoice-list',
          path: 'invoice-list',
          component: InvoiceList,
          requiresAuth: true,
          meta: {
            slug: 'Invoice List',
          },
        },
        {
          name: 'settings',
          path: 'settings',
          component: SettingsView,
          requiresAuth: true,
          meta: {
            slug: 'Settings',
          },
          children: [
            {
              name: 'personal-profile',
              path: 'personal-profile',
              component: RegisterForm,
              requiresAuth: true,
              meta: {
                slug: 'Personal Profile',
              },
            },
            {
              name: 'quickbooks-profile',
              path: 'quickbooks-profile',
              component: QuickBookAuthenticationForm,
              requiresAuth: true,
              meta: {
                slug: 'QuickBooks Profile',
              },
            },
            {
              name: 'kra-profile',
              path: 'kra-profile',
              component: KraSetup,
              requiresAuth: true,
              meta: {
                slug: 'Kra Profile',
              },
            },
          ]
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