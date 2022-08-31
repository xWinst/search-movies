import { useState, useEffect } from 'react';

import { UserAPI } from '../../services/api';
import { MovieList } from '../../components/MovieList/MovieList';
import s from './Home.module.css';

const Home = () => {
  const [trends, setTrends] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrends();
  }, []);

  async function fetchTrends() {
    try {
      setIsLoading(true);
      setError('');

      const moviesResponse = await UserAPI.fetchTrends();

      if (moviesResponse.ok) {
        const movies = await moviesResponse.json();

        setTrends([...movies.results]);
        return;
      }

      await Promise.reject(new Error(`There're no movies`));
      return;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const showTrends = !isLoading && trends;

  return (
    <div>
      <h1 className={s.title}>Trending</h1>
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}

      {showTrends && <MovieList movies={trends} />}
    </div>
  );
};

export default Home;
