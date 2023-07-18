import classes from "./List.module.css";
import ContainerWrapper from "../UI/ContainerWrapper";

function SortListPage(props) {
  return (
    <ContainerWrapper>
      <h3>Cписок фільмів, що відсортовані за назвою в алфавітному порядку</h3>
      <div className="my-4"></div>
    </ContainerWrapper>
  );
}
export default SortListPage;
