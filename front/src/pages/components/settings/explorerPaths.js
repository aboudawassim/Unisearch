import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExplorerPathsItems from "./ExplorerPathsItems";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 20, fontWeight: "bold" }}
        color="#8CA2EA"
        gutterBottom
      >
        Saved paths
      </Typography>
      <ExplorerPathsItems />
    </CardContent>
  </React.Fragment>
);

function ExplorerPaths() {
  return (
    <Box
      sx={{
        width: "70vw",
      }}
    >
      <Card
        variant="outlined"
        style={{
          border: "2px solid #213d89",
          borderRadius: "10px",
          paddingLeft: "20px",
        }}
      >
        {card}
      </Card>
    </Box>
  );
}

export default ExplorerPaths;
