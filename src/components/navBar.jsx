import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AddNew } from "../icons/addNew.svg";
import { ReactComponent as GraphsIcon } from "../icons/graphs.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import "./navBar.css";

export default function NavBar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <div className="navBar">
        <div className="container-navBar">
          <Link to="/">
            <HomeIcon className={pathname === "/" ? "activeNav" : "logoNav"} />
          </Link>
          <Link to="/add">
            <AddNew className={pathname === "/add" ? "activeNav" : "logoNav"} />
          </Link>
          <Link to="/graph">
            <GraphsIcon
              className={pathname === "/graph" ? "activeNav" : "logoNav"}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
