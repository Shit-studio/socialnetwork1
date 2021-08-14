import React from "react";
import classNames from "classnames";
import userImg from '../assets/img/userImg.png';
// import images from '../assets/img';
import { Link } from "react-router-dom";
import gearSvg from '../assets/img/gear.svg';
import bookmarkSvg from '../assets/img/bookmark.svg';
import ExitSvg from '../assets/img/exit.jsx';
import '../scss/usermenu.scss';
import { useSelector, useDispatch, connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

// const [gearSvg, bookmarkSvg, exitSvg] = images;

export function UserMenu() {
  const [isActive, setActive] = React.useState(false);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  React.useEffect(() => console.log(auth.user));

  return (
      <div onClick={()=>setActive(!isActive)} className={`user_menu ${classNames({active: isActive})}`}>
        <span>
          {`${auth.user.name} ${auth.user.surname}`}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6287 4.74599C19.3815 4.49855 19.0885 4.37494 18.7498 4.37494H1.25009C0.911336 4.37494 0.61848 4.49855 0.371047 4.74599C0.123614 4.99369 0 5.28655 0 5.6251C0 5.96359 0.123614 6.25644 0.371047 6.50394L9.12095 15.2539C9.36866 15.5013 9.66152 15.6252 10 15.6252C10.3385 15.6252 10.6316 15.5013 10.8788 15.2539L19.6287 6.50388C19.8759 6.25644 20 5.96359 20 5.62503C20 5.28655 19.8759 4.99369 19.6287 4.74599Z"
              fill="#E5E5E5"
            />
          </svg>
        </span>
        <div className="user_menu__popup active">
          <div className="a">
            <img width={60} height={60} src={userImg} alt="User" />
            <Link to={`/users/${auth.user.id}/`} >
            <div>
              <span>{`${auth.user.name} ${auth.user.surname}`}</span>
              <span>Перегляньте свій cock</span>
            </div>
            </Link>
          </div>
          <hr />
          <div className="options">
            <div><img width={30} height={30} src={bookmarkSvg} alt="bookmark" />Збережені</div>
            <div><img width={30} height={30} src={gearSvg} alt="gear" />Налаштування</div>
          </div>
          {/* <hr /> */}
          <div onClick={logoutHandler} className="exit"><ExitSvg width={25} height={25} fill="red" />Вийти</div>
        </div>
      </div>
  );
}

export default connect()(UserMenu);