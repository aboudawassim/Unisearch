import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import Avatar from "@mui/material/Avatar";

function GmailScreen() {
  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState();
  const clientId =
    "1009259971600-d3aarvg0uj1tl5hc0qe9u1hrql5kdap3.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://mail.google.com/",
      });
    };
    gapi.load("client:auth2", initClient);
    getProfileData();
  }, []);

  function getProfileData() {
    const accessToken = localStorage.getItem("accessToken");
    const profile = localStorage.getItem("profile");
    setProfile(JSON.parse(profile));
    setAccessToken(accessToken);
  }

  function setProfileData(data) {
    const accessToken = data.accessToken;
    const profile = data.profileObj;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    setProfile(profile);
    setAccessToken(accessToken);
  }

  const onSuccess = (res) => {
    setProfileData(res);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
    setAccessToken(null);
    localStorage.clear();
  };

  return (
    <div
      style={{
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "40px",
      }}
    >
      {profile ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            User Logged in as :
          </h3>
          <Avatar src={profile.imageUrl} alt="userImage" />
          <br />
          <span>{profile.name}</span>
          <span style={{ color: "lightgrey" }}>{profile.email}</span>
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>

    /*<div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile.name ? (
        <div>
          <p>accessToken : {accessToken}</p>
          <h3>User Logged in</h3>
          <img src={profile.img} alt="userImage" />
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>*/
  );
}

export default GmailScreen;
