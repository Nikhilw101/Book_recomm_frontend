import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Userdash from "./components/Userdash";
import Randombookgene from "./components/Randombookgene";
import BookAuto_recom from "./components/BookAuto_recom";
import Bookhistory from "./components/Bookhistory";
import Bookpreference from "./components/Bookpreference";
import LoginP from "./components/LoginP";
import SignupP from "./components/SignupP";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/Userdash", element: <Userdash /> },
  { path: "/Randombookgene", element: <Randombookgene /> },
  { path: "/BookAuto_recom", element: <BookAuto_recom /> },
  { path: "/Bookhistory", element: <Bookhistory /> },
  { path: "/Bookpreference", element: <Bookpreference /> },
  { path: "/LoginP", element: <LoginP /> },
  { path: "/SignupP", element: <SignupP /> }
]);

function Approuter() {
  return <RouterProvider router={router} />;
}

export default Approuter;
