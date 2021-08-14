import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import '../scss/Register.scss';

export function Register() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  // const [errors, setErrors] = React.useState({});

  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  })

  const submitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      password2: password2
    }

    dispatch(registerUser(newUser, history));
  }



  return (
    <div>
      <div className="ilyaGay">
        <div className="gay">
          <p>Welcome to the cum zone</p>
        </div>
        <div className="gaytwo">
          <form onSubmit={submitHandler}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="Ім'я"
            />
            <br />
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              id="surname"
              type="text"
              placeholder="Прізвище"
            />
            <br />

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

            <input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              id="password2"
              type="password"
              placeholder="Підтвердьте пароль"
            />

            <br />
            
            <div onClick={submitHandler} class="btn">Реєстрація</div>
            <span>Уже зареєстровані? <Link to="/auth/login">Увійти</Link>.</span>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);