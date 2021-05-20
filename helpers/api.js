
const ApiKey = 'e1e70c3c253879e7867ac5f62731892a';

const tmdbApi = {
  fetchTrending: 'https://api.themoviedb.org/3/trending/all/week?api_key=' + ApiKey + '&language=en-US',
  fetchNetflixOriginals: 'https://api.themoviedb.org/3/discover/tv?api_key=' + ApiKey + '&with_networks=213',
  fetchTopRated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + ApiKey + '&language=en-US',
  fetchActionMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=28',
  fetchComedyMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=35',
  fetchHorrorMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=$' + ApiKey + '&with_genres=27',
  fetchRomanceMovies: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=10749',
  fetchDocumentaries: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=99',
  fetchDrama: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=18',
  fetchFantasy: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=14',
  fetchMystery: 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=9648'
};
function fetchMovieById (id) { return 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + ApiKey + '&language=en-US'; }
function fetchMovieCredits (id) { return 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + ApiKey + '&language=en-US'; }
function fetchNetworkCompanies (id) { return 'https://api.themoviedb.org/3/network/' + id + '?api_key=' + ApiKey; }
function fetchNetworkMovies (id) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_networks=' + id; }
function fetchNetworkTvShows (id) { return 'https://api.themoviedb.org/3/discover/tv?api_key=' + ApiKey + '&with_networks=' + id; }
function querySearch (text) { return 'https://api.themoviedb.org/3/search/movie?api_key=' + ApiKey + '&language=en-US&query=' + text + '&page=1&include_adult=false'; }
function getNewTrendings (page) { return 'https://api.themoviedb.org/3/trending/all/week?api_key=' + ApiKey + '&language=en-US&page=' + page; }
function getNewMoviesById (id, page) { return 'https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&with_genres=' + id + '&page=' + page; }
function getNewTopRated (page) { return 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + ApiKey + '&language=en-US&page=' + page; }
const requests = {
  tmdbApi,
  fetchMovieById,
  fetchMovieCredits,
  fetchNetworkCompanies,
  fetchNetworkMovies,
  fetchNetworkTvShows,
  querySearch,
  getNewTrendings,
  getNewMoviesById,
  getNewTopRated,
};
export default requests;
