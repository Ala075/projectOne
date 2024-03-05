import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" >
      <div className="footer__content">
        <h2>LOGO</h2>
        <div className="footer__links">
          <div className="footer__link">
            <h2>Company</h2>
            <Link to="#">About Us</Link>
            <Link to="#">Blog</Link>
            <Link to="#">Contact Us</Link>
            <Link to="#">Careers</Link>
          </div>
          <div className="footer__link">
            <h2>Support and Legal</h2>
            <Link to="#">FAQ</Link>
            <Link to="#">Help Desk</Link>
            <Link to="#">Terms of Use</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className="footer__end">
        <p>{new Date().getFullYear()} &copy; Copyright | All right reserved.</p>
        <div className="footer__social">
          <Link to="https://facebook.com/">
            <Facebook />
          </Link>
          <Link to="https://instagram.com/">
            <Instagram />
          </Link>
          <Link to="https://twitter.com/">
            <Twitter />
          </Link>
          <Link to="https://github.com/">
            <Github />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
