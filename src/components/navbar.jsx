import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#009688"}}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse justify-content-between align-items-center w-100"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav mx-auto text-md-center text-left">
                <Link className="nav-link px-4" to="/batches">
                  Batches
                </Link>
                <Link className="nav-link px-4" to="/feedstock">
                  Feedstock
                </Link>
                <Link
                  className="nav-link px-4 navbar-brand mx-0 d-none d-md-inline text-light"
                  to="/"
                >
                  Admin Panel
                </Link>
                <Link className="nav-link px-4" to="/windrows">
                  Windrows
                </Link>
                <Link className="nav-link px-4" to="/orders">
                  Sensor Network
                </Link>
                {/* <Link className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</Link> */}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;
