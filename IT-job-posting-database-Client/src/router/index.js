// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/signup',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Signup',
        component: () => import('@/views/Signup.vue'),
      },
    ],
  },
  {
    path: '/applicants',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Logged',
        component: () => import('@/views/Applicants.vue'),
      },
    ],
  },

  //
  {
    path: '/vacancies',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'vacancy',
        component: () => import('@/views/Vacancies.vue'),
      },
    ],
  },

  {
    path: '/replies',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'replies',
        component: () => import('@/views/Replies.vue'),
      },
    ],
  },
  {
    path: '/all-replies',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Allreplies',
        component: () => import('@/views/AllReplies.vue'),
      },
    ],
  },
  //
  {
    path: '/create-resume',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Create resume',
        component: () => import('@/views/Create-resume.vue'),
      },
    ],
  },

  {
    path: '/create-category',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Add category',
        component: () => import('@/views/Create-category.vue'),
      },
    ],
  },


  {
    path: '/create-company',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: '',
        name: 'Add company',
        component: () => import('@/views/Create-company.vue'),
      },
    ],
  },


  {
    path: '/create-vacancy',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'create-vacancy',
        component: () => import('@/views/Create-vacancy.vue'),
      },
    ],
  },


  {
    path: '/resumes',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Account',
        component: () => import('@/views/Account.vue'),
      },
    ],
  },


  {
    path: '/admin',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
      },
    ],
  },
  {
    path: '/admin-edit',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: '',
        name: 'Admin-e',
        component: () => import('@/views/Admin-edit.vue'),
      },
    ],
  },

  {
    path: '/applicant',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Applicant',
        component: () => import('@/views/Applicant.vue'),
      },
    ],
  },
  {
    path: '/vacancy',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'Vacancy',
        component: () => import('@/views/Vacancy.vue'),
      },
    ],
  },

  {
    path: '/companies',
    component: () => import('@/layouts/logged/Default.vue'),
    children: [
      {
        path: '',
        name: 'companies',
        component: () => import('@/views/Companies.vue'),
      },
    ],
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
