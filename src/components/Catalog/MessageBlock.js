import { Alert } from "reactstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTitleActions } from "../../storage/deleteMovieSlice";

function MessageBlock(props) {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);

  const deleteTitle = useSelector((state) => state.deleteTitle.deleteFilmTitle);
  const errorStatus = useSelector((state) => state.deleteTitle.isErrorDelete);

  useEffect(() => {
    function loadMessage() {
      errorStatus && setSuccessMessage(false);
      deleteTitle !== "" && setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(null);
        dispatch(deleteTitleActions.setDeletedTitle(""));
      }, 2000);
      setTimeout(() => {
        dispatch(deleteTitleActions.setError(false));
      }, 1500);
    }
    (deleteTitle !== "" || errorStatus == true) && loadMessage();
    return clearTimeout();
  }, [deleteTitle, errorStatus]);

  return (
    <div>
      {successMessage === false && (
        <Alert color="danger" className="col-md-12 col-sm my-3">
          Помилка під час видалення фільму!
        </Alert>
      )}
      {successMessage && (
        <Alert color="success" className="col-md-12 col-sm my-3">
          Фільм з назвою {deleteTitle} видалено!
        </Alert>
      )}
    </div>
  );
}
export default MessageBlock;
