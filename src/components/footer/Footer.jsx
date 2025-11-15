import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <p>© {new Date().getFullYear()} GameTracker — David Chontal</p>
    </footer>
  );
}

export default Footer;
