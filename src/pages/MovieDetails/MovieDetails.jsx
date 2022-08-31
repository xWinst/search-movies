import { useState, useEffect, Suspense, lazy } from 'react';
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { UserAPI } from '../../services/api';
import s from './MovieDetails.module.css';

const LazyCast = lazy(() => import('../../components/Cast/Cast'));
const LazyReviews = lazy(() => import('../../components/Reviews/Reviews'));

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) return;
    fetchMovieById();
    // eslint-disable-next-line
  }, [movieId]);

  async function fetchMovieById() {
    try {
      setIsLoading(true);
      setError('');

      const movieResponse = await UserAPI.fetchMovieById(movieId);

      if (movieResponse.ok) {
        const movie = await movieResponse.json();

        setMovie(movie);
        return;
      }

      await Promise.reject(new Error(`Movie is not found`));
      return;
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function getGenres() {
    if (!movie) return;
    return movie.genres.map(genre => genre.name).join(', ');
  }
  function getScore() {
    if (!movie) return;
    const score = Math.round(movie.vote_average * 10);
    return score;
  }

  function onBtnClick() {
    if (location.state) {
      navigate(location.state.from);
      return;
    }

    navigate('/');
  }

  const showMovie = !isLoading && movie;

  return (
    <div>
      <button type="button" onClick={onBtnClick} className={s.button}>
        Go back
      </button>
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}
      {showMovie && (
        <div>
          <div className={s.movieContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie poster"
              className={s.poster}
            />
            <div>
              <section>
                <h1 className={s.title}>
                  {' '}
                  {movie.title ? movie.title : movie.name}
                </h1>
                <p>User Score: {getScore()}%</p>
              </section>
              <section>
                <h2 className={s.sectionTitle}>Overview</h2>
                <p>{movie.overview}</p>
              </section>
              <section>
                <h2 className={s.sectionTitle}>Genres</h2>
                <p>{getGenres()}</p>
              </section>
            </div>
          </div>
          <section>
            <div className={s.additionalContainer}>
              <h2 className={s.sectionTitle}>Additional information</h2>
              <NavLink
                to="cast"
                state={{ from: location.state.from }}
                className={s.navLink}
              >
                Cast
              </NavLink>
              <NavLink
                to="reviews"
                state={{ from: location.state.from }}
                className={s.navLink}
              >
                Reviews
              </NavLink>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="cast" element={<LazyCast />} />
                <Route path="reviews" element={<LazyReviews />} />
              </Routes>
            </Suspense>
          </section>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
