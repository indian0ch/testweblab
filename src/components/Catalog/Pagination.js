import { Button } from "reactstrap";
import { useReducer, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function reducerPagination(state, action) {
  switch (action.type) {
    case "initial_state": {
      return {
        isPrevActive: false,
        pageLink: 1,
        isNextActive: true,
      };
    }
    case "next_click": {
      return {
        isPrevActive: true,
        pageLink: state.pageLink++,
        isNextActive: action.status,
      };
    }
    case "previous_click": {
      if (state.pageLink === 1) {
        return {
          isPrevActive: false,
          pageLink: state.pageLink--,
          isNextActive: true,
        };
      }
      return {
        ...state,
        pageLink: state.pageLink--,
        isNextActive: true,
      };
    }
    case "next_status_change": {
      return {
        ...state,
        isNextActive: action.status,
      };
    }
  }
}

function Pagination(props) {
  let navigate = useNavigate();
  const { pageNumber } = useParams();
  const [statePagination, dispatchPagination] = useReducer(reducerPagination, {
    isPrevActive: false,
    pageLink: 1,
    isNextActive: true,
  });

  const nextAvailability = useSelector(
    (state) => state.paginationCounter.isNextAvailable
  );

  useEffect(() => {
    if (pageNumber === "1") {
      dispatchPagination({
        type: "initial_state",
      });
    }
  }, [pageNumber]);

  useEffect(() => {
    dispatchPagination({
      type: "next_status_change",
      status: nextAvailability,
    });
  }, [nextAvailability]);

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
              navigate(`/${statePagination.pageLink - 1}`);
            }}
          >
            Previous
          </Button>
        </li>
        <li className="page-item active">
          <Link className="page-link" to={`${statePagination.pageLink}`}>
            {statePagination.pageLink}
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
              dispatchPagination({
                type: "next_click",
                status: nextAvailability,
              });
              navigate(`/${statePagination.pageLink + 1}`);
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
