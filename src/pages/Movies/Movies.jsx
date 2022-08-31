import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchBox } from 'components/SearchBox/SearchBox';
import { MovieList } from '../../components/MovieList/MovieList';
import { UserAPI } from '../../services/api';
import s from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';

  useEffect(() => {
    if (movieName === '') return;
    fetchMovies(movieName);

    // eslint-disable-next-line
  }, [movieName]);

  function onSearchSubmit(searchQuery) {
    setSearchParams({ query: searchQuery });
  }

  async function fetchMovies(movieName) {
    try {
      setIsLoading(true);
      setError('');

      const moviesResponse = await UserAPI.fetchMovies(movieName);

      if (moviesResponse.ok) {
        const movies = await moviesResponse.json();

        setMovies([...movies.results]);
        return;
      }

      Promise.reject(new Error(`There're no movies`));
      return;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const showMovies = !isLoading && movies;

  return (
    <div>
      <h1 className={s.title}>Movies</h1>
      <SearchBox onSubmit={onSearchSubmit} />
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}

      {showMovies && <MovieList movies={movies} />}
    </div>
  );
};

export default Movies;
