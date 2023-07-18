import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "../../shared/components/UIElements/Input";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
      dark: "#f8961e",
    },
  },
});

const UpdatePlaces = () => {
  const placeId = useParams().placeId;
  const [placeFound, setPlaceFound] = useState(null);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );
  const history = useHistory();
  const user = useContext(AuthContext);
  const { error, isLoading, setError, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );

        if (responseData.place) {
          setPlaceFound(true);
          setFormData(
            {
              title: { value: responseData.place.title, isValid: true },
              description: { value: responseData.place.description, isValid: true },
            },
            true
          );
        }
      } catch (e) {}
    };

    fetchPlaceData();
  }, [placeId, sendRequest, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      );
      history.push(`/${user.userId}/places`);
    } catch (err) {}
  };

  if (!placeFound && !error) {
    return (
      <div>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorAlert
          open={error}
          setOpen={() => {
            setError(false);
          }}
        />
      )}
      {placeFound && !isLoading ? (
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 600,
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
              }}
            >
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "100%", pr: "1rem" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
              >
                <Input
                  id="title"
                  label="Title"
                  validators={[VALIDATOR_REQUIRE()]}
                  error={"This field should not be empty."}
                  onInput={inputHandler}
                  initialValue={formState.inputs.title.value}
                  initialIsValid={formState.inputs.title.isValid}
                />
                <Input
                  id="description"
                  label="Description"
                  type="textarea"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  error={"Please enter a valid description (at least 5 characters)."}
                  onInput={inputHandler}
                  initialValue={formState.inputs.description.value}
                  initialIsValid={formState.inputs.description.isValid}
                />
                <Grid item>
                  <Button
                    type="submit"
                    disabled={!formState.isValid}
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Update Place
                  </Button>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </ThemeProvider>
  );
};

export default UpdatePlaces;
