import { Button } from "reactstrap";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import classes from "./Catalog.module.css";

function reducerPagination(state, action) {
  switch (action.type) {
    case "next_click": {
      return {
        isPrevActive: true,
        firstLink: state.firstLink++,
        secondLink: state.secondLink++,
        thirdLink: state.thirdLink++,
      };
    }
    case "previous_click": {
      if (state.firstLink === 1) {
        return {
          isPrevActive: false,
          firstLink: state.firstLink--,
          secondLink: state.secondLink--,
          thirdLink: state.thirdLink--,
        };
      }
      return {
        isPrevActive: true,
        firstLink: state.firstLink--,
        secondLink: state.secondLink--,
        thirdLink: state.thirdLink--,
      };
    }
  }
}

function Pagination(props) {
  const [statePagination, dispatchPagination] = useReducer(reducerPagination, {
    isPrevActive: false,
    firstLink: 1,
    secondLink: 2,
    thirdLink: 3,
  });

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
            onClick={() => dispatchPagination({ type: "previous_click" })}
          >
            Previous
          </Button>
        </li>
        <li className="page-item">
          <Link className="page-link" to={`${statePagination.firstLink}`}>
            {statePagination.firstLink}
          </Link>
        </li>
        <li className="page-item active">
          <Link className="page-link" to={`${statePagination.secondLink}`}>
            {statePagination.secondLink}
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to={`${statePagination.thirdLink}`}>
            {statePagination.thirdLink}
          </Link>
        </li>
        <li className="page-item ">
          <Button
            className="page-link"
            onClick={() => dispatchPagination({ type: "next_click" })}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
