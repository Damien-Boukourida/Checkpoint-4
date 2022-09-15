import "./NewGame.scss";
import { useReducer } from "react";
import createGameReducer, { initialState } from "../reducers/createGameReducer";
import axios from "../services/axios";
import Header from "@components/Header";

const NewGame = () => {
  const [state, dispatch] = useReducer(createGameReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("games/create", {
        name: state.name,
        plateform: state.plateform,
      });
      dispatch({ type: "RESET_FORM" });
      return alert("Game successfully created");
    } catch (err) {
      if (err?.response?.status === 400) {
        return alert("Error during game creation");
      }
      return alert(JSON.stringify(err.message));
    }
  };

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
                className="gameName"
                placeholder="Name of the game ?"
                type="text"
                required
                value={state.name}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_NAME",
                    payload: e.target.value,
                  })
                }
              />
              <select
                className="plateform"
                required
                value={state.plateform}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_PLATEFORM", payload: e.target.value })
                }
              >
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
                  <button className="addImage" type="files" >Add image</button>
                </li>
                <li>
                  <button className="save" onClick={handleSubmit}>
                    Create
                  </button>
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
