import { useState, useRef } from "react";

import Header from "../main/Header";
import Uids from "../body/Uids";
import Ready from "../body/Ready";
import Messages from "../body/Messages";

const Layout = () => {
  const [nav, setNav] = useState("ready");
  const layoutRef = useRef();

  const slideHandler = () => {
    layoutRef.current.classList.toggle("slide");
  };

  return (
    <div className="layout" ref={layoutRef}>
      <button className="btn" onClick={slideHandler}>
        SLIDE
      </button>
      <Header setNav={setNav} />
      {nav === "uids" && <Uids />}
      {nav === "ready" && <Ready />}
      {nav === "messages" && <Messages />}
    </div>
  );
};

export default Layout;
