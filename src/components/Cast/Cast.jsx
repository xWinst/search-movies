import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAPI } from '../../services/api';
import s from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { movieId } = useParams();
  useEffect(() => {
    if (!movieId) return;
    fetchMovieCast();
    // eslint-disable-next-line
  }, []);

  async function fetchMovieCast() {
    try {
      setIsLoading(true);
      setError('');

      const reviews = await UserAPI.fetchMovieCast(movieId);

      if (reviews.ok) {
        const cast = await reviews.json();
        setCast(cast.cast);
        return;
      }

      await Promise.reject(new Error(`Cast is not found`));
      return;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const showCast = !isLoading && cast;

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}

      {showCast && (
        <ul className={s.list}>
          {cast.map(item => (
            <li key={item.id}>
              {item.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                  alt={item.name}
                  className={s.photo}
                />
              )}
              <h3 className={s.name}>{item.name}</h3>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
