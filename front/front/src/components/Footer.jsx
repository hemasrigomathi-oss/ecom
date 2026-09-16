import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./footer.css";

function Footer() {
  return (
    <footer className="shoppy-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            SHOPPY
          </Link>

          <p>
            Discover timeless style, everyday essentials, and products selected
            to make your shopping experience better.
          </p>

          <div className="footer-social">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>SHOP</h3>
          <Link to="/">Home</Link>
          <Link to="/products">New Arrivals</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>ACCOUNT</h3>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">History</Link>
          <Link to="/profile">Profilet</Link>
        </div>

        <div className="footer-column">
          <h3>COMPANY</h3>
          <Link to="/about">About Us</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/about">Contact</Link>
          <Link to="/about">Support</Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>CONTACT</h3>
          <p>Coimbatore, Tamil Nadu</p>
          <p>support@shoppy.com</p>
          <p>+91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SHOPPY. All Rights Reserved.</p>

        <div>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
