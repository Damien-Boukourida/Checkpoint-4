import "./MyGames.scss";
import Header from "@components/Header";
import Cards from "@components/Cards";
import { Link } from "react-router-dom";

const MyGames = () => {
  return (
    <div className="Mygames">
      <div className="header-homepage">
        <Header />
      </div>
      <div className="game_links">
        <div className="game_link">
          <ul>
            <li>
              <Link to="/new-game" className="navbar_link">
                Add new game
              </Link>
            </li>
            <li>
              <input
                className="searchbar"
                type="text"
                placeholder="Search.."
              ></input>
            </li>
          </ul>
        </div>
      </div>
      <div className="games">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
};

export default MyGames;
