import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

class Footer extends Component {
  render() {
    return (
      <>
        <div class="footer-dark">
          <footer>
            <div class="container">
              <div class="row">
                <div class="col-sm-6 col-md-3 item">
                  <h3>Services</h3>
                  <ul>
                    <li>
                      <Link to="/">Admin Panel</Link>
                    </li>
                    <li>
                      <Link to="/items">Items</Link>
                    </li>
                    <li>
                      <Link to="/categories">Categories</Link>
                    </li>

                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                    <li>
                      <Link to="/orders">Sales</Link>
                    </li>
                  </ul>
                </div>
               
                <div class="col-md-6 item text">
                  <h3>EBEE Digital</h3>
                  <p>
                    We keep ourselves updated every second passed in the world of technology so that you do not have to worry
                    anymore for beign left out. Now it's only a one click away to get the most latest, innovative products, 
                    gadgets and smart systems.
                  </p>
                </div>
                <div class="col item social">
                  <a href="#">
                    <FacebookIcon />
                  </a>
                  <a href="#">
                    <YouTubeIcon />
                  </a>
                  <a href="#">
                    <TwitterIcon />
                  </a>
                  <a href="#">
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
              <p class="copyright">EBEE Digital © 2021</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default Footer;
