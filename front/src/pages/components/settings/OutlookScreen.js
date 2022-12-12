import { Button } from "@mui/material";
import { React, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import MicrosoftLogin from "react-microsoft-login";
var outlookProfilePic = require("../../../assets/images/outlook_image.png");

function OutlookScreen() {
  const clientId = "5b3d2e08-bbe7-4809-bb58-142f7b731d6b";
  const [msalInstance, onMsalInstanceChange] = useState();
  const loginHandler = (err, data, msal) => {
    console.log(err, data);
    // some actions
    if (!err && data) {
      onMsalInstanceChange(msal);
    }
  };

  const logoutHandler = () => {
    msalInstance.logout();
  };

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      {msalInstance ? (
        <div>
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
            <Avatar
              src={outlookProfilePic}
              alt={msalInstance.account.name}
              style={{
                width: "50px",
                height: "50px",
              }}
            />
            <br />
            <span>{msalInstance.account.name}</span>
            <span style={{ color: "lightgrey" }}>
              {msalInstance.account.userName}
            </span>
            <br />
          </div>
          <Button variant="outlined" onClick={logoutHandler}>
            <LogoutIcon />
            <span
              style={{
                marginLeft: "20px",
              }}
            >
              Logout
            </span>
          </Button>
        </div>
      ) : (
        <MicrosoftLogin clientId={clientId} authCallback={loginHandler} />
      )}
    </div>
    // <Button
    //   variant="outlined"
    //   className="ml-auto"
    //   onClick={() => handleLogin(instance)}
    //   style={{
    //     marginTop: "20px",
    //   }}
    // >
    //   <MailOutlineIcon />
    //   <span
    //     style={{
    //       marginLeft: "20px",
    //       color: "black",
    //     }}
    //   >
    //     Sign in to outlook
    //   </span>
    // </Button>
  );
}

export default OutlookScreen;
