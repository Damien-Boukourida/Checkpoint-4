import "./Login.scss";
import Header from "@components/Header";

const Login = () => {
  return (
    <div className="LoginContainer">
      <div className="header-homepage">
        <Header />
      </div>
      <div className="forms">
        <div className="loginform">
          <div className="logs">
            <div className="textes">
              <div className="phrases">
                <p className="first">You already have an account ?</p>
              </div>
            </div>
            <div className="champs">
              <input type="text" placeholder="Email :" />
              <input type="text" placeholder="Password :" />
            </div>
            <div className="loginButton">
              <button className="boutonlogin">Login</button>
            </div>
          </div>
        </div>
        <div className="registerform">
          <div className="regist">
            <div className="textes">
              <div className="phrases">
                <p className="first">Don't have an account ?</p>
                <p className="second">Create one !</p>
              </div>
            </div>
            <div className="Inputs">
              <input type="text" placeholder="Lastname :" />
              <input type="text" placeholder="Firstname :" />
              <input type="text" placeholder="Nickname :" />
              <input type="text" placeholder="Email :" />
              <input type="text" placeholder="Password :" />
              <input type="text" placeholder="Comfirm password :" />
            </div>
            <div className="registButton">
              <button className="boutoncreacompte">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
