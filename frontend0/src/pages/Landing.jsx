import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Logout from "../auth/Logout.jsx";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Header />
      <div className="landing">
        <div className="container">
          <div className="content">
            <div className="text">
              <h2>Build your business with us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptatem, quos, accusantium voluptatum, rem quod voluptate
                dolorum nesciunt quas voluptatibus quae. Quisquam, quas
                voluptates? Quisquam, quas voluptates?
              </p>
              <button>

                <Link to="/Dashboard"><span>Let's Go</span></Link>
              </button>
            </div>
            <div className="img">
              <img src="src/assets/undraw_react_re_g3ui.svg" alt="landing" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
