import ImportForm from "../components/Import/ImportForm";
import ContainerWrapper from "../components/UI/ContainerWrapper";

function ImportPage(props) {
  return (
    <ContainerWrapper>
      <h2>Імпорт фільмів з текстового файлу</h2>
      <div className="my-4">
        <ImportForm />
      </div>
    </ContainerWrapper>
  );
}
export default ImportPage;
