import React from "react";

import { Link } from "react-router-dom";

import "./Nav.css";

function SimpleTabs(props) {
  return {
    ...(props.reshrink ? (
      <div className="nav__links">
        <Link to="/underwater" className="nav__linkHome">
          <span>Underwater</span>
        </Link>
        <Link to="/landscapes" className="nav__link">
          Landscapes
        </Link>
        <Link to="/towns" className="nav__link">
          Towns
        </Link>
        <Link to="/restaurants" className="nav__link">
          Restaurants
        </Link>
        <Link to="/business" className="nav__link">
          Business
        </Link>
        <Link to="/upload" className="nav__link">
          Upload
        </Link>
      </div>
    ) : (
      <div className="nav__linksSmall">
        <ul className="navigationMenu">
          <li>
            <a href="/underwater" className="nav__linkUnderwater">
              <span>Underwater</span>
            </a>
          </li>
          <li>
            <Link to="/landscapes" className="nav__linkLandscapes">
              <span>Landscapes</span>
            </Link>
          </li>
          <li>
            <Link to="/towns" className="nav__linkTowns">
              <span>Towns</span>
            </Link>
          </li>
          <li>
            <Link to="/restaurants" className="nav__linkRestaurants">
              <span>Restaurants</span>
            </Link>
          </li>
          <li>
            <Link to="/business" className="nav__linkBusiness">
              <span>Business</span>
            </Link>
          </li>
        </ul>
      </div>
    )),
  };
}

export default SimpleTabs;
