
const ApiKey = 'e1e70c3c253879e7867ac5f62731892a';

const tmdbApi = {
  fetchTrending: 'https://api.themoviedb.org/3/trending/all/week?api_key=' + ApiKey + '&language=en-US',
  fetchTopRated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + ApiKey + '&language=en-US',
  fetchActionMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=28',
  fetchComedyMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=35',
  fetchHorrorMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=27',
  fetchWarMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=10752',
  fetchDocumentaries: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=99',
  fetchDrama: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=18',
  fetchFantasy: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=14',
  fetchMystery: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=9648',
  fetchPersons: 'https://api.themoviedb.org/3/person/popular?api_key=' + ApiKey + '&language=en-US&page=1'
};
function fetchMovieById (id) { return 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + ApiKey + '&language=en-US'; }
function fetchActorById (id) { return 'https://api.themoviedb.org/3/person/' + id + '?api_key=' + ApiKey + '&language=en-US'; }
function fetchActorStarredIn (id) { return 'https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + ApiKey + '&language=en-US'; }
function fetchMovieCredits (id) { return 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + ApiKey + '&language=en-US'; }
function fetchNetworkCompanies (id) { return 'https://api.themoviedb.org/3/network/' + id + '?api_key=' + ApiKey; }
function fetchNetworkMovies (id) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_networks=' + id; }
function fetchNetworkTvShows (id) { return 'https://api.themoviedb.org/3/discover/tv?api_key=' + ApiKey + '&with_networks=' + id; }
function querySearch (text) { return 'https://api.themoviedb.org/3/search/movie?api_key=' + ApiKey + '&language=en-US&query=' + text + '&page=1&include_adult=false'; }
function getNewTrendings (page) { return 'https://api.themoviedb.org/3/trending/all/week?api_key=' + ApiKey + '&language=en-US&page=' + page; }
function getNewMoviesById (id, page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=' + id + '&page=' + page; }
function fetchTrending (page) { return 'https://api.themoviedb.org/3/trending/all/week?api_key=' + ApiKey + '&language=en-US&page=' + page }
function fetchTopRated (page) { return 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + ApiKey + '&language=en-US&page=' + page }
function fetchActionMovies (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=28&page=' + page }
function fetchComedyMovies (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=35&page=' + page }
function fetchHorrorMovies (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=27&page=' + page }
function fetchWarMovies (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=10752&page=' + page }
function fetchDocumentaries (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=99&page=' + page }
function fetchDrama (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=18&page=' + page }
function fetchFantasy (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=14&page=' + page }
function fetchMystery (page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=9648&page=' + page }
function fetchSimilar (id) { return 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + ApiKey + '&language=en-US&page=1' }
const requests = {
  tmdbApi,
  fetchMovieById,
  fetchActorById,
  fetchMovieCredits,
  fetchNetworkCompanies,
  fetchNetworkMovies,
  fetchNetworkTvShows,
  querySearch,
  getNewTrendings,
  getNewMoviesById,
  fetchTrending,
  fetchActorStarredIn,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchWarMovies,
  fetchDocumentaries,
  fetchDrama,
  fetchFantasy,
  fetchMystery,
  fetchSimilar
};
export default requests;
