import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "./userCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed.feed);

    const fetchFeed = async () => {
        try {
            if(feed.length > 0) return;
            const res = await axios.get(API_BASE_URL + '/user/feed', { withCredentials: true })
            dispatch(addFeed(res.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFeed();
    }, []);

    if(!feed) return;

    if(feed.length <= 0)  return <h1 className="text-2xl font-bold text-center my-30"> No new users found </h1>
    return(
       feed[0] && <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    )
};

export default Feed;
