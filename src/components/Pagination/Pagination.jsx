import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {
  setCurrentPage,
  setOffset,
  setLimit,
} from '~/store/ducks/pagination/actions';
import { fetchPokemonList } from '~/store/ducks/pokemon/actions';

import './Pagination.scss';

export const Pagination = (props) => {
  const { total, limit: customLimit } = props;

  const dispatch = useDispatch();
  const { currentPage, offset, limit } = useSelector((state) => state.pagination);

  const serializedTotal = Math.round(parseFloat(total / 20));

  useEffect(() => {
    if (limit !== customLimit) {
      dispatch(setLimit(customLimit));
      dispatch(fetchPokemonList());
    }
  }, []);

  const handlePrev = () => {
    dispatch(setOffset(offset - limit));
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchPokemonList());
  };
  
  const handleNext = () => {
    dispatch(setOffset(offset + limit));
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchPokemonList());
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button--prev"
        type="button"
        onClick={handlePrev}
        disabled={currentPage < 2}
      >
          Previous
      </button>

      <div className="pagination__pages">
        <span>Page:</span>
        <span>{currentPage}/{serializedTotal}</span>
      </div>

      <button
        className="pagination__button pagination__button--next"
        type="button"
        onClick={handleNext}
        disabled={currentPage >= serializedTotal}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  limit: 20,
};