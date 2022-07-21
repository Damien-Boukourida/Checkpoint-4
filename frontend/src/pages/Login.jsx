import "./Login.scss";
import Header from "@components/Header";
import { useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import * as yup from "yup";
import registerUserReducer, {
  initialState,
} from "../reducers/registerUserReducer";
import axios from "../services/axios";

// password must contain almost one upper case, one lower case, a number and a special character contained in [!@#$%^&*], and have 8 to 32 characters
const schemaForCreation = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])/,
      "Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Password must be almost 8 characters")
    .max(32, "Password must be max 32 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])/,
      "Confirm Password must contain almost one upper case, one lower case, one number and a special character contained in [!@#$%^&*]"
    )
    .min(8, "Confirm Password and Password must be almost 8 characters")
    .max(32, "Confirm Password and Password must be max 32 characters")
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password and Confirm Password must match"),
  email: yup
    .string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
  username: yup.string().required("username is required"),
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
});

const Login = () => {
  const [state, dispatchRegister] = useReducer(registerUserReducer, initialState);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      await schemaForCreation.validate(state);

      await axios.post("users/register", {
        email: state.email,
        password: state.password,
        username: state.username,
        firstname: state.firstname,
        lastname: state.lastname,
      });
      dispatchRegister({ type: "RESET_FORM" });
      return alert("User registered successfully");
    } catch (err) {
      if (err?.response?.status === 400) {
        return alert("Email already used");
      }
      return alert(JSON.stringify(err.message));
    }
  };

  const { dispatch } = userContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return alert("You must provide an email and a password");
    }
    try {
      const { data } = await axios.post("users/login", userData, {
        withCredentials: true,
      });
      // console.log(data);
      setUserData({ email: "", password: "" });
      dispatch({ type: "LOGIN", payload: data });
      return null;
    } catch (err) {
      return alert(err.message);
    }
  };

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
              <input
                id="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email :"
              />
              <input
                id="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Password :"
              />
            </div>
            <div className="loginButton">
              <button className="boutonlogin" onClick={handleSubmitLogin}>Login</button>
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
            <form className="Inputs" onSubmit={handleSubmitRegister}>
              <input
                id="lastname"
                type="lastname"
                placeholder="Lastname :"
                value={state.lastname}
                onChange={(e) =>
                  dispatchRegister({ type: "UPDATE_LASTNAME", payload: e.target.value })
                }
                required
              />
              <input
                id="firstname"
                type="firstname"
                placeholder="Firstname :"
                value={state.firstname}
                onChange={(e) =>
                  dispatchRegister({
                    type: "UPDATE_FIRSTNAME",
                    payload: e.target.value,
                  })
                }
                required
              />
              <input
                id="username"
                type="username"
                placeholder="Nickname :"
                value={state.username}
                onChange={(e) =>
                  dispatchRegister({
                    type: "UPDATE_USERNAME",
                    payload: e.target.value,
                  })
                }
                required
              />
              <input
                id="email"
                type="email"
                placeholder="Email :"
                value={state.email}
                onChange={(e) =>
                  dispatchRegister({ type: "UPDATE_EMAIL", payload: e.target.value })
                }
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password :"
                value={state.password}
                onChange={(e) =>
                  dispatchRegister({ type: "UPDATE_PASSWORD", payload: e.target.value })
                }
                required
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Comfirm password :"
                value={state.confirmPassword}
                onChange={(e) =>
                  dispatchRegister({
                    type: "UPDATE_CONFIRM_PASSWORD",
                    payload: e.target.value,
                  })
                }
                required
              />

              <button className="boutoncreacompte" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
