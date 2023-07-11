import React from "react";
import UserList from "../components/UserList";
import Grid from "@mui/material/Grid";
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Test User",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      places: 2,
    },
    {
      id: "u2",
      name: "Test User",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      places: 2,
    },
  ];
  return (
    <Grid container>
      <div>
        <UserList items={USERS} />
      </div>
    </Grid>
  );
};

export default Users;
