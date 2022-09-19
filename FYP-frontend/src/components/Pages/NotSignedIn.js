import "./cartView.css";
import { Link } from "react-router-dom";

export default function NotSignedIn() {
  return (
    <div className="cart-container">
      <div className="empty-page">
        <h2>Please Login/Sign Up</h2>
        <br/>
        <Link to="/login">Login</Link>
        <span>OR</span>
        <Link to="/SignUp">Sign Up</Link>
      </div>
    </div>
  );
}
