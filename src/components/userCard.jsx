import {useDispatch} from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

const UserCard = (user) => {
    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user?.user;
    
    const dispatch = useDispatch();

    const handleRequest = (status, requestId) => {
        try{
            const response = axios.post(API_BASE_URL + `/request/send/${status}/${requestId}`,{},  {withCredentials: true})
            dispatch(removeUserFromFeed(requestId));
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img src={photoUrl} alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{about}</p>
                {age && gender && <p>{age} years old {gender}</p>}
                {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {Array.isArray(skills) ? (
                            skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                                {skills}
                            </span>
                        )}
                    </div>
                )}

                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary " onClick={() => handleRequest("ignored", _id)}>Ignored</button>
                    <button className="btn btn-secondary" onClick={() => handleRequest("intrested", _id)}>Intrested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard