import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Classes from "./UserItem.module.css";
import Grid from "@mui/material/Grid";

const UserItem = (props) => {
  return (
    <Grid container direction="row" justifyContent="space-around" alignItems="flex-start">
      <Card
        className={Classes.card}
        sx={{
          width: 250,
          height: 100,
          backgroundColor: "#28282B",
          borderRadius: 2.5,
          "&:hover": {
            backgroundColor: "#FFAA33",
          },
          mt: "1rem",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar
              alt={props.name}
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              sx={{ width: 64, height: 64 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: "1rem" }}>
              <Typography className={Classes.text} sx={{ fontSize: 21, color: "#FFAA33" }}>
                {props.name}
              </Typography>
              <Typography
                className={Classes.text}
                sx={{ fontSize: 16, color: "#fff", mt: "5px", fontWeight: 500 }}
              >
                {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserItem;
