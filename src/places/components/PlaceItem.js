import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import ModalElement from "../../shared/components/UIElements/ModalElement";
import Map from "../../shared/components/UIElements/Map";
import { Link } from "react-router-dom";
import Classes from "./PlaceItem.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const auth = useContext(AuthContext);
  const { sendRequest, error, setError, isLoading } = useHttpClient();
  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const cancelDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteModalHandler = async () => {
    setShowDeleteModal(false);
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, "DELETE", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <Grid item sx={{ mb: "2rem" }}>
      {isLoading && <LoadingSpinner />}
      <Card sx={{ width: 400 }}>
        {error && (
          <ErrorAlert
            open={error}
            setOpen={() => {
              setError(false);
            }}
          />
        )}
        <CardActionArea>
          <CardMedia
            component="img"
            style={{ height: "auto" }}
            image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.address}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            View on map
          </Button>
          {auth.userId === props.creatorId && (
            <Button size="small" color="primary">
              <Link to={`/places/${props.id}`} className={Classes.link}>
                Edit
              </Link>
            </Button>
          )}
          {auth.userId === props.creatorId && (
            <Button size="small" color="primary" onClick={showDeleteModalHandler}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
      <ModalElement open={open} setOpen={setOpen} title={props.title}>
        <div>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </ModalElement>
      <ModalElement
        type={"warning"}
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        title={"Are you sure?"}
        description={
          "Do you want to proceed and delete this place? Please note that it can't be undone thereafter."
        }
      >
        <div style={{ paddingTop: "1rem" }}>
          <Button variant="outlined" onClick={cancelDeleteModalHandler}>
            Cancel
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="contained"
            color="error"
            onClick={confirmDeleteModalHandler}
          >
            DELETE
          </Button>
        </div>
      </ModalElement>
    </Grid>
  );
};

export default PlaceItem;
