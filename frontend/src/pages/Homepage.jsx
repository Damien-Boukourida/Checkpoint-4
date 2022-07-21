import Header from "@components/Header";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="header-homepage">
        <Header />
      </div>
      <div className="contain">
        <div className="container">
          <div className="text">
            <h1>What is GameDesk ?</h1>
            <h2>
              GameDesk is a platform that allows you to list all your games so
              you can find them more easily without having to search for hours.
            </h2>
          </div>
          <div className="carre">
            <div className="big-square"></div>
            <div className="small-square"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
