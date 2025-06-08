import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_BASE_URL + '/logout', {}, {
                withCredentials: true
            });
            dispatch(removeUser());
            return navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            dispatch(removeUser());
            return navigate('/login');
        }
    }
  return (
    <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">💻 DevSync</Link>
    </div>
    {user && <div className="flex gap-2">
      <p className="text-xl italic items-center flex">Welcome {user.firstName}</p>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-7">
          <div className="w-10 rounded-full">
            <img
              alt="User PhotoUrl"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link> 
          </li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="/" onClick={logout}>Logout</Link></li>
        </ul>
      </div>
    </div>}
  </div>
  );
};

export default Navbar;