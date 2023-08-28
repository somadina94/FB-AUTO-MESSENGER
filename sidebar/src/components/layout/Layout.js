import { useState } from "react";

import Header from "../main/Header";
import Uids from "../body/Uids";
import Ready from "../body/Ready";
import Messages from "../body/Messages";

const Layout = () => {
  const [nav, setNav] = useState("ready");
  return (
    <div className="layout">
      <Header setNav={setNav} />
      {nav === "uids" && <Uids />}
      {nav === "ready" && <Ready />}
      {nav === "messages" && <Messages />}
    </div>
  );
};

export default Layout;
