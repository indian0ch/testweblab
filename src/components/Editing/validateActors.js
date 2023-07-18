export function validateActors(inputText){
    console.log(inputText.split(","));
    const arrActors = inputText.split(",");
    arrActors.forEach((actor) => {
      const simpleActorArr = actor.split(" ");
      console.log(actor.split(" "));
    });
}