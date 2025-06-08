import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = () => {
    const connections = useSelector((state) => state.connection.connections);
    const dispatch = useDispatch();

    const getConnections = async () => {
        try {
            const response = await axios.get(API_BASE_URL + '/user/connections', {
                withCredentials: true
            });
            dispatch(addConnection(response.data));
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    };
    useEffect(() => {
        getConnections();
    }, []);
    return (

        <div className="flex items-center justify-center min-h-screen bg-base-200 -mt-80">
            <ul className="list bg-base-100 rounded-box shadow-md max-h-[700px] w-full md:w-[700px] overflow-y-auto">
                <li className="p-4 pb-2 justify-center items-center flex font-bold text-red-500 text-2xl opacity-60 tracking-wide uppercase">
                    Developer Connections
                </li>
                {connections.map((user) => (
                    <li key={user._id} className="list-row flex items-center gap-4 px-4 py-3 border-t border-base-200">
                        <div>
                            <img className="size-30 rounded-box object-cover" src={user.photoUrl} alt="Profile" />
                        </div>

                        <div className="flex-1">
                            <div className="font-semibold capitalize">
                                {user.firstName} {user.lastName}
                            </div>
                            {user.age && (
                                <div className="text-md text-black-500 mt-1">{user.age} years old {user.gender}</div>
                            )}

                            {user.about && (
                                <p className="text-md text-black-600 mt-1 line-clamp-2">{user.about}</p>
                            )}

                            {user.skills && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {user.skills.map((skill, idx) => (
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Connections;