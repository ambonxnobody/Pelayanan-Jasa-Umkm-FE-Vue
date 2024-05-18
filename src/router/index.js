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
    component: () => import('@/views/pages/Layanan/LayananAdminAddLayanan.vue'),
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
    path: '/dashboard-pelanggan',
    name: 'dashboard-pelanggan',
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
    path: '/pesan-servis-pelanggan',
    name: 'pesan-servis-pelanggan',
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
    path: '/layanan-pelanggan',
    name: 'layanan-pelanggan',
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
    path: '/riwayat-pelanggan',
    name: 'riwayat-pelanggan',
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
    path: '/riwayat-admin',
    name: 'riwayat-admin',
    component: () => import('@/views/pages/Riwayat/RiwayatAdmin.vue'),
    meta: {
      title: 'Riwayat Admin',
      requiresAuth: true,
      meta: {
        requiresAuth: true
      },
    }
  },
  {
    path: '/riwayat-teknisi',
    name: 'riwayat-teknisi',
    component: () => import('@/views/pages/Riwayat/RiwayatTeknisi.vue'),
    meta: {
      title: 'Riwayat Teknisi',
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
  {
    path: '/registrasi',
    name: 'registrasi',
    component: () => import('@/views/pages/Registrasi.vue'),
    meta: {
      title: 'registrasi'
    }
  }
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