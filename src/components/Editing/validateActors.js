export function validateActors(inputText) {
  const arrActors = inputText.split(",");
  arrActors.forEach((actor) => {
    return actor.split(" ").filter((word) => word !== "");
  });

  return arrActors;
}
