import "./NewGame.scss";
import Header from "@components/Header";

const NewGame = () => {
  return (
    <div className="NewGame">
      <div className="header-homepage">
        <Header />
      </div>
      <div className="contenuNewGame">
        <div className="question">You have a new game ?!</div>
        <div className="formulaire">
          <div className="jeux">
            <div className="creategame">
              <input
                type="text"
                className="gameName"
                placeholder="Name of the game ?"
              />
              <select className="plateform">
                <option value="playstation">Playstation</option>
                <option value="playstation2">Playstation 2</option>
                <option value="playstation3">Playstation 3</option>
                <option value="playstation4">Playstation 4</option>
                <option value="playstation5">Playstation 5</option>
                <option value="xbox">Xbox</option>
                <option value="xbox 360">Xbox 360</option>
                <option value="xbox One S/X">Xbox One S/X</option>
                <option value="xboxSeries">Xbox Series S/X</option>
                <option value="pc">PC</option>
              </select>
            </div>
          </div>
          <div className="image">
            <div className="chooseimage">
              <div className="uploadedImage"></div>
              <ul className="imageButtons">
                <li>
                  <button className="addImage" type="file">Add image</button>
                </li>
                <li>
                  <button className="save">Save</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
