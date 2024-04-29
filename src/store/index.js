export const authMixin = {
    methods: {
      isAuthenticated() {
        return !!localStorage.getItem('token');
      }
    }
  };

  