import { Fragment, useRef, useState } from "react";
import SearchForm from "./SearchForm";

function SearchBlock(props) {
  const [isTitleEmpty, setTitleEmpty] = useState(false);
  const [isActorEmpty, setActorEmpty] = useState(false);
  const titleRef = useRef();
  const actorRef = useRef();

  function onTitleHandler(event) {
    event.preventDefault();
    if (titleRef.current.value) {
      console.log(titleRef.current.value); // Accessing the value of the input using the forwarded ref
    } else {
      setTitleEmpty(true);
    }
  }

  function onActorHandler(event) {
    event.preventDefault();
    if (actorRef.current.value) {
      console.log(actorRef.current.value); // Accessing the value of the input using the forwarded ref
    } else {
      setActorEmpty(true);
    }
  }

  return (
    <div className="my-2">
      <SearchForm
        ref={titleRef}
        type="title"
        title="назвою"
        id="filmTitle"
        label="Назва"
        isEmpty={isTitleEmpty}
        setEmpty={setTitleEmpty}
        onSubmitHandler={onTitleHandler}
      ></SearchForm>
      <SearchForm
        ref={actorRef}
        type="title"
        title="акторем"
        id="filmActor"
        label="Актор"
        isEmpty={isActorEmpty}
        setEmpty={setActorEmpty}
        onSubmitHandler={onActorHandler}
      ></SearchForm>
    </div>
  );
}
export default SearchBlock;
