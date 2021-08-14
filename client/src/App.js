import "./App.scss";
import { Header } from "./components";
import { Home, Login, Register } from "./pages";
import UserProfile from "./pages/UserProfile";
import { Switch, Route } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import PrivateRoute from "./components/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./auth/login";
  }
}

function App() {
  return (
    <Provider store={store}>
    <div>
      <Header />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/users/:id/*" component={UserProfile} />
      </Switch>
    </div>
    </Provider>
  );
}

export default App;
