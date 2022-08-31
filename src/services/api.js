const API_KEY = 'dddf682d6a330b3ee1156a5db67c7481';
const BASE_URL = 'https://api.themoviedb.org/3';

export const UserAPI = {
  fetchTrends: async () => {
    const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;
    const response = await fetch(`${url}`);
    return response;
  },
  fetchMovies: async searchQuery => {
    const requestName = searchQuery.split(' ').join('+');
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${requestName}&language=en-US&page=1&include_adult=false`;
    const response = await fetch(`${url}`);
    return response;
  },
  fetchMovieById: async id => {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    const response = await fetch(`${url}`);
    return response;
  },
  fetchMovieCast: async id => {
    const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
    const response = await fetch(`${url}`);
    return response;
  },
  fetchMovieReviews: async id => {
    const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`;
    const response = await fetch(`${url}`);
    return response;
  },
};
