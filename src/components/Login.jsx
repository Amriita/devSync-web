import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { API_BASE_URL } from "../utils/constant";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + '/login', { email, password }, {withCredentials: true})
            .then((response) => {
                dispatch(addUser(response.data));
                navigate('/feed');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen -mt-20">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <form onSubmit={handleSubmit}>
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
                        <div className="card-actions justify-center mt-6">
                            <button type="submit" className="btn btn-primary w-full">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;