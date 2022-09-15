import "./Cards.scss";

const Cards = () => {
  return (
    <div className="cardBody">
      <div className="cardImage"></div>
      <div className="gameInformation">
        <div className="gameName">
          <p className="gameTitle">Grand Theft Auto V</p>
        </div>
        <p className="gamePlateform">Playstation 4</p>
      </div>
    </div>
  );
};

export default Cards;
