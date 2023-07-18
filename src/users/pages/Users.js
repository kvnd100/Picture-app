import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import Grid from "@mui/material/Grid";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState(null);
  const { isLoading, error, sendRequest, setError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`);
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error && (
        <ErrorAlert
          severity={"info"}
          open={error}
          setOpen={() => {
            setError(null);
          }}
        />
      )}
      <Grid sx={{ ml: "4rem" }} container>
        {isLoading && <LoadingSpinner />}
        <div>{loadedUsers && <UserList items={loadedUsers} />}</div>
      </Grid>
    </>
  );
};

export default Users;
