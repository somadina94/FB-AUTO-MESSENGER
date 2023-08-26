import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <NavLink
        to="/uids"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        UIDS
      </NavLink>
      <NavLink
        to="/messages"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        MSG'S
      </NavLink>
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? classes.active : "")}
      >
        +IVE
      </NavLink>
    </nav>
  );
};

export default Navigation;
