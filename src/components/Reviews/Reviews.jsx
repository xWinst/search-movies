import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import { UserAPI } from '../../services/api';
import s from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { movieId } = useParams();
  useEffect(() => {
    if (!movieId) return;
    fetchMovieReviews();
    // eslint-disable-next-line
  }, []);

  async function fetchMovieReviews() {
    try {
      setIsLoading(true);
      setError('');

      const response = await UserAPI.fetchMovieReviews(movieId);

      if (response.ok) {
        const reviews = await response.json();

        if (reviews.total_results === 0) {
          await Promise.reject(
            new Error(`We don't have any reviews for this movie.`)
          );
          return;
        }

        setReviews(reviews.results);
        return;
      }

      await Promise.reject(
        new Error(`We don't have any reviews for this movie.`)
      );
      return;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const showReviews = !isLoading && reviews;

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <div>Loading...</div>}

      {showReviews && (
        <ul>
          {reviews.map(item => (
            <li key={item.id} className={s.item}>
              <h3 className={s.title}>Author: {item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Reviews;
