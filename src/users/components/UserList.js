import React from "react";
import UserItem from "./UserItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Classes from "./UserItem.module.css";
import { Link } from "react-router-dom";
const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
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
          }}
        >
          <CardContent sx={{ textAlign: "center", pt: "2rem" }}>
            <Typography className={Classes.text} sx={{ fontSize: 21, color: "#FFAA33" }}>
              No Users!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: "0rem" }}>
      {props.items.map((val) => (
        <Link to={`/${val.id}/places`} style={{ textDecoration: "none", padding: "1rem" }}>
          <UserItem
            key={val.id}
            id={val.id}
            image={val.image}
            name={val.username}
            placeCount={val.places.length}
          />
        </Link>
      ))}
    </ul>
  );
};

export default UserList;
