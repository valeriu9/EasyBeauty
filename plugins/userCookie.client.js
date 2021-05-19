export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const userData = $cookies.get('movie_user');

    if (userData) {
      app.store.dispatch('user/userLoggedIn', userData);
    }
    next();
  });
};
