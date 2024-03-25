import { useState, useRef } from "react";

import Header from "../main/Header";
import Uids from "../body/Uids";
import Ready from "../body/Ready";
import Messages from "../body/Messages";
import Key from "../body/Key";
import Warning from "../body/Warning";

const Layout = () => {
  const [nav, setNav] = useState("ready");
  const layoutRef = useRef();

  const slideHandler = () => {
    layoutRef.current.classList.toggle("slide");
  };

  window.addEventListener("warning", async (event) => {
    setNav("warning");
  });

  return (
    <div className="layout" ref={layoutRef}>
      <button className="btn" onClick={slideHandler}>
        SLIDE
      </button>
      <Header setNav={setNav} />
      {nav === "warning" && <Warning />}
      {nav === "uids" && <Uids />}
      {nav === "ready" && <Ready />}
      {nav === "messages" && <Messages />}
      {nav === "key" && <Key />}
    </div>
  );
};

export default Layout;
