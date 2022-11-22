import React, { useEffect, useState} from "react";
// import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Profile.css";
import { AiOutlineMail } from "react-icons/ai";
// import PropTypes from "prop-types";

/**
 * Amanda Au-Yeung
 * 
 * @returns jsx of profile rendering 
 */
function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    const getCurrentUser = async () => {
      await fetch("/getUser")
      .then(res=>{ console.log(res);
        return res.json()})
      .then(data=>{
        console.log("get current user", data);
       if (data.user === null){
         navigate("/login")
       }
      })
   }
   
   getCurrentUser();
  }, []);

  const [profile, setProfile] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    subjects: "",
    location: "",
  });
  const [schedule, setSchedule] = useState([]);
  // const [pic, setPic] = useState(null);
  
   // if there is no user, then we redirect to login
   

  // setting default values
  useEffect(() => {
    const fetchExistData = async () => {
      await fetch("/profile/editProfile")
      .then(res => res.json())
      .then(data => {
        let profileInDB = data.profile;
        let profileData = new Map();
        profileData['username'] = profileInDB.displayName;
        profileData['fName'] = profileInDB.fName;
        profileData['lName'] = profileInDB.lName;
        profileData['email'] = profileInDB.email;
        profileData['subjects'] = profileInDB.subjects;
        profileData['location'] = profileInDB.location;
        setProfile(profileData);
        setSchedule(data.profile.schedule);
        // setPic(data.profile.pic);
      })
    } 
    fetchExistData();
  }, [])

  return (
    <div className="container-profile">
      <div className="main-profile">
      <div>
      {profile.username ? "Hi, " + profile.username : "Welcome! Please proceed to edit your profile."}
      </div>
      <div>
      <AiOutlineMail/> {profile.email?  + profile.email: "Add your email in your edit profile settings."}
      {/* image */}
      </div>
      <div>
      {profile.schedule? "My preferred schedule is " + schedule.join(", ") : "Please select your preferred schedule in Edit Profile"}.
      </div>
      <div>
      Welcome! Here is your overview of your schedule.
      </div>
      </div>
      <div className="schedule">
      
      </div>
      
      <div className="profile">
    <div className=""></div>
      </div>
      
    </div>
  );
}

export default Profile;
