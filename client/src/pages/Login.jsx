import React from 'react'
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import '../scss/Register.scss';

export function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // const [errors, setErrors] = React.useState({});

    const auth = useSelector(state => state.auth);
    const errors = useSelector(state => state.errors);

    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
        }

        dispatch(loginUser(userData, history));
    }

    React.useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/");
        }
    })

    return (
        <div>
            <div className="ilyaGay">
        <div className="gay">
          <p>Welcome to the cum zone</p>
        </div>
        <div className="gaytwo">
          <form onSubmit={submitHandler}>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Електронна адреса"
            />
            <br />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Пароль"
            />
            <br />

            <div onClick={submitHandler} class="btn">Log In</div>
            <span>Ще не зареєстровані? <Link to="/auth/register">Створити обліковий запис</Link>.</span>
          </form>
        </div>
      </div>
        </div>
    )
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);