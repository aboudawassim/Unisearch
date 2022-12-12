import { Avatar, Typography } from "@mui/material";
import React from "react";

function ProfilePage() {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
      <Typography variant="h5">General informations</Typography>
      <div style={{ marginTop: "20px" }}>
        <Avatar
          {...stringAvatar("Kent Dodds")}
          sx={{ width: 70, height: 70 }}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
