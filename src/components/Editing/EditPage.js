import { Fragment } from "react";
import classes from "./EditPage.module.css";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";

function EditPage(props) {
  return (
    <Fragment>
      <div className={` container-md my-5`}>
        <div className="col-md-8 col-12 mx-auto">
          <h2>Додати фільм</h2>
          <div className="my-4">
            <AddForm />
          </div>
        </div>
        <div className="col-md-8 col-12 mx-auto">
          <h2>Видалити фільм</h2>
          <div className="my-4">
            <DeleteForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default EditPage;
