import ImportForm from "./ImportForm";

function ImportPage(props) {
  return (
    <div className={`container-md my-5`}>
    <div className="col-md-8 col-12 mx-auto">
      <h2>Імпорт фільмів з текстового файлу</h2>
      <div className="my-4">
        <ImportForm />
      </div>
    </div>
  </div>
  );
}
export default ImportPage;