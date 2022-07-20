import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <header>
        <div className="top">
          <div className="nickname">
            <Link className="name" to="/">
              GAMEDESK
            </Link>
          </div>
          <div className="link">
            <ul className="links">
              <li className="mygames">
                <Link to="/mygames" className="navbar_link">
                  MyGames
                </Link>
              </li>
              <li className="login">
                <Link to="/login-register" className="navbar_link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="separation"></div>
      </header>
    </div>
  );
};

export default Header;
