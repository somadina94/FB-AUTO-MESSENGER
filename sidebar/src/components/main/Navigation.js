import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const { setNav } = props;
  const uidsHandler = () => {
    setNav("uids");
  };
  const messagesHandler = () => {
    setNav("messages");
  };
  const readyHandler = () => {
    setNav("ready");
  };
  return (
    <nav className={classes.nav}>
      <button onClick={uidsHandler}>UIDS</button>
      <button onClick={messagesHandler}>MSG'S</button>
      <button onClick={readyHandler}>+VE</button>
    </nav>
  );
};

export default Navigation;
