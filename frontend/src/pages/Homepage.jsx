import Header from "@components/Header";
import "./Homepage.scss";
import logoGithub from "@assets/images/github.png";
import logolinkedin from "@assets/images/linkedin.png";

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
      <div className="reseaux">
        <a
          className="logoLinkedin"
          href="https://www.linkedin.com/in/damien-boukourida/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="logoLink" src={logolinkedin} alt="Linkedin logo" />
          <p>LinkedIn</p>
        </a>
        <a
          className="logoGithub"
          href="https://github.com/Damien-Boukourida"
          target="_blank"
          rel="noreferrer"
        >
          <img className="logoGit" src={logoGithub} alt="Github logo" />
          <p>GitHub</p>
        </a>
      </div>
    </div>
  );
};

export default Homepage;
