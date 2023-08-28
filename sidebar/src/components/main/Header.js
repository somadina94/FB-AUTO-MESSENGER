import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <Navigation setNav={props.setNav} />
    </header>
  );
};

export default Header;
