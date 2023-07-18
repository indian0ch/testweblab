import classes from "./EditPage.module.css";
import ContainerWrapper from "../UI/ContainerWrapper";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EditPage(props) {
  const location = useLocation();
  return (
    <ContainerWrapper>
      <h2 className="text-center">Редагування даних</h2>
      <ContainerWrapper>
        {location.pathname === "/editing/add" && <h2>Додати фільм</h2>}
        {location.pathname === "/editing/delete" && <h2>Видалити фільм</h2>}
        <div className="my-4">
          <Outlet></Outlet>
        </div>
      </ContainerWrapper>
    </ContainerWrapper>
  );
}
export default EditPage;
