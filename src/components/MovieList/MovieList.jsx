import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map(item => {
        return (
          <li key={item.id} className={s.item}>
            <Link
              to={`/movies/${item.id}`}
              state={{ from: location }}
              className={s.link}
            >
              {item.title ? item.title : item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { MovieList };
