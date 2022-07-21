import "./Login.scss";
import Header from "@components/Header";
import { useReducer } from "react";
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
  const [state, dispatch] = useReducer(registerUserReducer, initialState);

  const handleSubmit = async (e) => {
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
      dispatch({ type: "RESET_FORM" });
      return alert("User registered successfully");
    } catch (err) {
      if (err?.response?.status === 400) {
        return alert("Email already used");
      }
      return alert(JSON.stringify(err.message));
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
            <form className="Inputs" onSubmit={handleSubmit}>
              <input
                id="lastname"
                type="lastname"
                placeholder="Lastname :"
                value={state.lastname}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_LASTNAME", payload: e.target.value })
                }
                required
              />
              <input
                id="firstname"
                type="firstname"
                placeholder="Firstname :"
                value={state.firstname}
                onChange={(e) =>
                  dispatch({
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
                  dispatch({
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
                  dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
                }
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password :"
                value={state.password}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
                }
                required
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Comfirm password :"
                value={state.confirmPassword}
                onChange={(e) =>
                  dispatch({
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
