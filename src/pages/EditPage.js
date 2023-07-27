import ContainerWrapper from "../components/UI/ContainerWrapper";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EditPage(props) {
  const location = useLocation();
  return (
    <ContainerWrapper>
      <h2 className="text-center">Редагування даних</h2>
      {location.pathname === "/editing/add" && <h3>Додати фільм</h3>}
      <div className="my-4">
        <Outlet></Outlet>
      </div>
    </ContainerWrapper>
  );
}
export default EditPage;
