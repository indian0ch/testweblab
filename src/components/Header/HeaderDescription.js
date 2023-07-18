import classes from "./Header.module.css";

function HeaderDescription(props) {
  return (
    <div className={classes.headerDescription}>
      <h1>Веб-програмa для зберігання інформації про фільми</h1>
      <p>🇺🇦</p>
    </div>
  );
}
export default HeaderDescription;
