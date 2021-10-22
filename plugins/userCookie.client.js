export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    checkCookie(app.store);
    next();
  });
};

function checkCookie (store) {
  if ($cookies.get('easybeauty_user') !== null) {
    store.dispatch('user/userLoggedIn', $cookies.get('easybeauty_user'));
  }
}
