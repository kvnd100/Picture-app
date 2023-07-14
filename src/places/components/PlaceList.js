import React from "react";
import PlaceItem from "./PlaceItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const PlaceList = (props) => {
  if (!props.items || props.items.length === 0) {
    return (
      <>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <div>No Places!</div>
          <Button href="/places/new" variant="contained">
            Share Place
          </Button>
        </Grid>
      </>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </Grid>
  );
};

export default PlaceList;
