import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = () => {
    localStorage.clear();
    history.push("/home");
    dispatch(authActions.logout());
  };

  return (
    <button onClick={handleDelete} className="logout">
      LogOut
    </button>
  );
};
export default Logout;
