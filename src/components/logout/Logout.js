import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TOKEN } from "store/Auth";
import { removeCookieToken } from "store/Cookie";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    removeCookieToken();
    dispatch(DELETE_TOKEN());
    navigate("/");
  };

  return <button onClick={logout}>로그아웃</button>;
};

export default Logout;
