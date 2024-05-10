import {
  createRouter,
  createWebHistory
} from 'vue-router';

const routes = [{
    path: '/',
    name: 'Landing Page',
    component: () => import('@/views/pages/LandingPage.vue'),
    meta: {
      title: 'Landing Page'
    }
  },
  {
    path: '/dashboard-admin',
    name: 'dashboard-admin',
    component: () => import('@/views/pages/Dashboard/DashboardPemilik.vue'),
    meta: {
      title: 'Dashboard Admin',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    },
  },
  {
    path: '/pesanan-admin',
    name: 'pesanan-admin',
    component: () => import('@/views/pages/Pesanan/PesananAdmin.vue'),
    meta: {
      title: 'Pesanan Admin',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    },
  },
  {
    path: '/layanan-admin',
    name: 'layanan-admin',
    component: () => import('@/views/pages/Layanan/TampilLayananPemilik.vue'),
    meta: {
      title: 'Layanan Admin',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    },
  },
  
  {
    path: '/layanan-admin-add-teknisi',
    name: 'layanan-admin-add-teknisi',
    component: () => import('@/views/pages/Layanan/LayananAdminAddTeknisi.vue'),
    meta: {
      title: 'Tambah Teknisi',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    },
  },
  {
    path: '/dashboard-teknisi',
    name: 'dashboard-teknisi',
    component: () => import('@/views/pages/Dashboard/DashboardTeknisi.vue'),
    meta: {
      title: 'Dashboard Teknisi',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/pesanan-teknisi',
    name: 'pesanan-teknisi',
    component: () => import('@/views/pages/Pesanan/PesananTeknisi.vue'),
    meta: {
      title: 'Pesanan Teknisi',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/dashboard-pembeli',
    name: 'dashboard-pembeli',
    component: () => import('@/views/pages/Dashboard/DashboardPembeli.vue'),
    meta: {
      title: 'Dashboard Pembeli',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/pesan-servis-pembeli',
    name: 'pesan-servis-pembeli',
    component: () => import('@/views/pages/Pesanan/PesanServisPembeli.vue'),
    meta: {
      title: 'Pesan Servis Pembeli',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/layanan-pembeli',
    name: 'layanan-pembeli',
    component: () => import('@/views/pages/Layanan/LayananPembeli.vue'),
    meta: {
      title: 'Layanan Pembeli',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/riwayat-pembeli',
    name: 'riwayat-pembeli',
    component: () => import('@/views/pages/Riwayat/RiwayatPembeli.vue'),
    meta: {
      title: 'Riwayat Pembeli',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      title: 'Login'
    }
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;