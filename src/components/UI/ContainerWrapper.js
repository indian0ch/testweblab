function ContainerWrapper(props) {
  return (
    <div className={`container-md my-5`}>
      <div className="col-md-8 col-12 mx-auto">{props.children}</div>
    </div>
  );
}
export default ContainerWrapper;
