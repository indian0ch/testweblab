import { Fragment } from "react";
import { ListGroup, Alert } from "reactstrap";
import MovieRow from "../Catalog/MovieRow";

function SearchResult(props) {
  return (
    <Fragment>
      {props.movieData && (
        <ListGroup className="mb-5">
          <MovieRow
            key={props.movieData.id}
            id={props.movieData.id}
            title={props.movieData.title}
          />
        </ListGroup>
      )}
      {props.movieData === false && (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          {props.alertText}
        </Alert>
      )}
    </Fragment>
  );
}
export default SearchResult;
