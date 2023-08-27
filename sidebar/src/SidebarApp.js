import { Fragment } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import Uids from "./components/body/Uids";
import Messages from "./components/body/Messages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Uids />} />
      <Route path="uids" element={<Uids />} />
      <Route path="messages" element={<Messages />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function SidebarApp() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default SidebarApp;
