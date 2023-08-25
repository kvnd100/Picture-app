import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
const UserPlaces = () => {
  const userId = useParams().userId;
  const { error, isLoading, sendRequest, setError } = useHttpClient();
  const [places, setPlaces] = useState();

  const placeDeleteHandler = (deletedPlaceId) => {
    setPlaces((prev) => prev.filter((place) => place.id !== deletedPlaceId));
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, setPlaces, userId]);

  return (
    <>
      <ErrorAlert
        open={error}
        setOpen={() => {
          setError(null);
        }}
      />
      <Grid container>
        {isLoading && <LoadingSpinner />}

        <PlaceList onDeletePlace={placeDeleteHandler} items={places} />
      </Grid>
    </>
  );
};

export default UserPlaces;
