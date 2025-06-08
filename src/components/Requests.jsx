import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { addRequestConnection, removeRequestConnection } from "../utils/RequestConnection";
import { useEffect } from "react";

const Requests = () => {
    const requests = useSelector((state) => state.requestConnection.requests);
    const dispatch = useDispatch();

    const getRequests = async () => {
        try {
            const response = await axios.get(API_BASE_URL + '/user/requests/received', {
                withCredentials: true
            });
            dispatch(addRequestConnection(response.data));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const acceptAndReject = async (requestId, status) => {
        try {
            await axios.post(API_BASE_URL + `/request/review/${status}/${requestId}`, { requestId }, {
                withCredentials: true
            });
            dispatch(removeRequestConnection(requestId))
            getRequests();
            
        } catch (error) {
            console.error('Error accepting connection:', error);
        }
    };
    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 -mt-80">
            <ul className="list bg-base-100 rounded-box shadow-md max-h-[700px] w-full md:w-[700px] overflow-y-auto">
                <li className="p-4 pb-2 justify-center items-center flex font-bold text-red-500 text-2xl opacity-60 tracking-wide uppercase">
                    Developer Requests
                </li>
                {requests.map((user) => (
                    <li key={user._id} className="list-row flex items-center gap-4 px-4 py-3 border-t border-base-200">
                        <div>
                            <img className="size-30 rounded-box object-cover" src={user?.senderId?.photoUrl} alt="Profile" />
                        </div>

                        <div className="flex-1">
                            <div className="font-semibold capitalize">
                                {user?.senderId?.firstName} {user?.senderId?.lastName}
                            </div>
                            {user?.senderId?.age && user?.senderId?.gender && (
                                <div className="text-md text-black-500 mt-1">{user?.senderId?.age} years old {user?.senderId?.gender}</div>
                            )}

                            {user?.senderId?.about && (
                                <p className="text-md text-black-600 mt-1 line-clamp-2">{user?.senderId?.about}</p>
                            )}

                            {user?.senderId?.skills && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {user?.senderId?.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="card-actions justify-center mt-6">
                            <button type="submit" className="btn btn-primary w-half" onClick={() => acceptAndReject(user._id, 'accepted')}>Accepted</button>
                            <button type="submit" className="btn btn-primary w-half" onClick={() => acceptAndReject(user._id, 'rejected')}>Rejected</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Requests;