import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Input from "../../shared/components/UIElements/Input";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "../../shared/hooks/form-hook";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
      dark: "#f8961e",
    },
  },
});

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40.7484405, lng: -73.9878584 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
];
const UpdatePlaces = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((value) => placeId === value.id);
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: { value: identifiedPlace.title, isValid: true },
          description: { value: identifiedPlace.description, isValid: true },
        },
        true
      );
    }
    setIsLoading(false);
  }, [identifiedPlace, setFormData]);

  if (!identifiedPlace) {
    return (
      <div>
        <h2>Could not find place!</h2>
      </div>
    );
  }
  const submitHandler = (event) => {
    event.preventDefault();
  };

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default UpdatePlaces;
