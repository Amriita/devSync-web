import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { API_BASE_URL } from "../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const fetchUser = () => {
        if(user) return;
        axios.get(API_BASE_URL + '/profile/view', {withCredentials: true})
            .then((response) => {
                dispatch(addUser(response.data));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchUser();
    }, []);
    
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;