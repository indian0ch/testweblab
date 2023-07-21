import { Button } from "reactstrap";
import { useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function reducerPagination(state, action) {
  switch (action.type) {
    case "initial_state": {
      const count = action.counts;
      if (count <= 1) {
        return {
          ...state,
          isPrevActive: false,
          countsPage: count,
          secondLink: 1,
          isNextActive: false,
        };
      }
      return {
        ...state,
        isPrevActive: false,
        countsPage: count,
        secondLink: 1,
        isNextActive: true,
      };
    }
    case "next_click": {
      console.log(state.countsPage);
      console.log(state.secondLink);
      return {
        ...state,
        isPrevActive: true,
        secondLink: state.secondLink++,
        isNextActive: true,
      };
    }
    case "previous_click": {
      if (state.secondLink === 1) {
        return {
          ...state,
          isPrevActive: false,
          secondLink: state.secondLink--,
          isNextActive: true,
        };
      }
      return {
        ...state,
        secondLink: state.secondLink--,
        isNextActive: true,
      };
    }
  }
}

function Pagination(props) {
  let navigate = useNavigate();
  const [statePagination, dispatchPagination] = useReducer(reducerPagination, {
    isPrevActive: false,
    secondLink: 1,
    countsPage: 0,
    isSecondActive: true,
    isNextActive: true,
  });
  const pagesCounts = useSelector(
    (state) => state.paginationCounter.pagesCount
  );

  useEffect(() => {
    dispatchPagination({ type: "initial_state", counts: pagesCounts });
  }, [pagesCounts]);

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li
          className={`page-item ${
            statePagination.isPrevActive === false ? "disabled" : null
          }`}
        >
          <Button
            className="page-link"
            onClick={() => {
              dispatchPagination({ type: "previous_click" });
              navigate(`/${statePagination.secondLink - 1}`);
            }}
          >
            Previous
          </Button>
        </li>
        <li className="page-item active">
          <Link className="page-link" to={`${statePagination.secondLink}`}>
            {statePagination.secondLink}
          </Link>
        </li>
        <li
          className={`page-item ${
            statePagination.isNextActive === false ? "disabled" : null
          }`}
        >
          <Button
            className="page-link"
            onClick={() => {
              dispatchPagination({ type: "next_click" });
              navigate(`/${statePagination.secondLink + 1}`);
            }}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
