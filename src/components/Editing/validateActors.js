export function validateActors(inputText) {
  console.log(inputText.split(","));
  const arrActors = inputText.split(",");
  arrActors.forEach((actor) => {
    return actor.split(" ").filter((word) => word !== "");
  });

  return arrActors;
}
