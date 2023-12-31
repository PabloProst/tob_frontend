import React, { useState, useEffect } from "react";
import "./Profile.css";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { updateProfile } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { CustomInput } from "../../common/PageNavbar/CustomInput/CustomInput";
import { getUpgradeById } from "../../services/apiCalls";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datosRdxUser = useSelector(userData);
  const [profile, setProfile] = useState({
    name: datosRdxUser.credentials.name,
    email: datosRdxUser.credentials.email,
  });
  const token = datosRdxUser.credentials.token;
  const [profileError, setProfileError] = useState({
    nameError: '',
    emailError: ''
  });
  const [isEnabled, setIsEnabled] = useState(true);
  const [userUpgrades, setUserUpgrades] = useState([]);
  
  useEffect(() => {
    if (!datosRdxUser.credentials) {
      navigate("/");
    } else {
      getUpgradeData(datosRdxUser.credentials.user_id);
    }
  }, [datosRdxUser]);

  useEffect(() => {
    console.log("Perfil actualizado:", profile);
  }, [profile]);

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setProfileError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendData = () => {
    updateProfile(profile, datosRdxUser)
      .then(result => {
        console.log("Datos enviados");
        console.log(profile);
        console.log(token);
        dispatch(login(profile));
        setIsEnabled(true);
      })
      .catch(error => {
        console.log(error);
        setIsEnabled(true);
      });
  }

  const getUpgradeData = async (userId) => {
    try {
      const upgrades = await getUpgradeById(userId);
      setUserUpgrades(upgrades.upgrades);
    } catch (error) {
      console.error('Error fetching user upgrades:', error);
    }
  };

  return (
    <div className="profile-border">
      <div className="profileDesign">
        <div className="text-profile">NAME</div>
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.nameError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"name"}
          placeholder={""}
          value={profile.name}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className="text-profile">EMAIL</div>
        <CustomInput
          disabled={isEnabled}
          design={`inputDesign ${profileError.emailError !== "" ? "inputDesignError" : ""
            }`}
          type={"email"}
          name={"email"}
          placeholder={""}
          value={profile.email}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />

        {isEnabled
          ? (<div className="editDesign" onClick={() => setIsEnabled(!isEnabled)}>EDIT</div>)
          : (<div className="sendDesign" onClick={() => sendData()}>SAVE</div>)
        }

        <div className="text-profile-achievements">MY ACHIEVEMENTS</div>
        <div className="my-achievements-profile">
          {userUpgrades.length === 0 ? (
            <div>No achievements</div>
          ) : (
            userUpgrades.map((upgrade) => (
              <div key={upgrade.id}>{upgrade.upgrade.name}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
