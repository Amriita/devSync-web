import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { API_BASE_URL } from "../utils/constant";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + '/login', { email, password }, { withCredentials: true })
            .then((response) => {
                dispatch(addUser(response.data));
                navigate('/');
            })
            .catch((error) => {
                setErrorMessage(error?.response?.data);
            });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + '/signup', { email, password, firstName, lastName }, { withCredentials: true })
            .then((response) => {
                dispatch(addUser(response.data));
                navigate('/profile');
            })
            .catch((error) => {
                setErrorMessage(error?.response?.data);
            });
    };  

    return (
        <div className="flex justify-center items-center h-screen -mt-20">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLogin ? 'Login' : 'Signup'}</h2>
                    <form onSubmit={isLogin ? handleSubmit : handleSignup}>
                        {!isLogin ? <div className="form-control py-2">
                            <label className="label">
                                <span className="label-text font-bold">FirstName</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your firstName"
                                className="input input-bordered w-full"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div> : null}
                        {!isLogin ? <div className="form-control py-2">
                            <label className="label">
                                <span className="label-text font-bold">lastName</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your lastName"
                                className="input input-bordered w-full"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div> : null}
                        <div className="form-control py-2">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control py-2">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <p className="text-red-500">{errorMessage}</p>
                        <div className="card-actions justify-center mt-6">
                            <button type="submit" className="btn btn-primary w-full">{isLogin ? 'Login' : 'Signup'}</button>
                            </div>
                            <p onClick={() => setIsLogin(!isLogin)} className="text-center mt-6 cursor-pointer">{isLogin ? 'Don\'t have an account? Signup' : 'Already have an account? Login'}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;