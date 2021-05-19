export function initializeUserData (store) {
  const userIsLoggedIn = $cookies.get('movie_user');

  if (userIsLoggedIn) {
    store.dispatch('user/userLoggedIn', $cookies.get('movie_user'));
  }
}
