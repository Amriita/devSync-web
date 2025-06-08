import UserCard from "./userCard";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = (user) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user?.user?.firstName)
    const [lastName, setLastName] = useState(user?.user?.lastName)
    const [age, setAge] = useState(user?.user?.age || " ")
    const [gender, setGender] = useState(user?.user?.gender || " ")
    const [skills, setSkills] = useState(user?.user?.skills || " ")
    const [about, setAbout] = useState(user?.user?.about || " ")
    const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl)
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.patch(API_BASE_URL + '/profile/edit', { firstName, lastName, age, gender, skills, about, photoUrl }, {withCredentials: true})
            dispatch(addUser(response.data));
            setShowToast(true);
            // Hide the toast after 3 seconds
            setTimeout(() => setShowToast(false), 3000);
        }
        catch(error){
            console.log(error)
        }
        
    }   
    return (
        <div className="flex justify-center my-10">
            {/* Toast Notification */}
            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success">
                        <span>Profile updated successfully!</span>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center mx-10">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Login</h2>
                        <form onSubmit={handleSubmit}  >
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">firstName</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your firstName"
                                    className="input input-bordered w-full"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">lastName</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your lastName"
                                    className="input input-bordered w-full"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">age</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your age"
                                    className="input input-bordered w-full"
                                    required
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your photo URL"
                                    className="input input-bordered w-full"
                                    required
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </div>
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">gender</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your gender"
                                    className="input input-bordered w-full"
                                    required
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">skills</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your skills"
                                    className="input input-bordered w-full"
                                    required
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </div>
                            <div className="form-control py-2">
                                <label className="label">
                                    <span className="label-text font-bold">about</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your about"
                                    className="input input-bordered w-full"
                                    required
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </div>
                            <div className="card-actions justify-center mt-6">
                                <button type="submit" className="btn btn-primary w-full">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, skills, about, photoUrl }} />
        </div>
    );
};

export default EditProfile;