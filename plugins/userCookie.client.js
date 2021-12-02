export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    checkCookie(app.store, to);
    next();
  });
};

function checkCookie (store, to) {
  if ($cookies.get('easybeauty_user') !== null) {
    store.dispatch('user/userLoggedIn', $cookies.get('easybeauty_user'));
  }
  else {
    if (to.name !== 'login') {
      window.location.href = '/login'
    }
  }
}
