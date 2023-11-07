import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useLogoutMutation } from "../../../slices/userApiSlice";
import { logout } from "../../../slices/authSlice";

import "./NavLinks.css";

const NavLinks = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(logout());

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">
          ALL USERS
        </NavLink>
      </li>
      {userInfo && (
        <li>
          <NavLink to={`/${userInfo._id}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {userInfo && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!userInfo && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {userInfo && (
        <li>
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
