export function initializeUserData (store) {
  const userIsLoggedIn = $cookies.get('easybeauty_user');

  if (userIsLoggedIn) {
    store.dispatch('user/userLoggedIn', $cookies.get('easybeauty_user'));
  }
}
