import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Input from "../../shared/components/UIElements/Input";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/UIElements/ImageUpload";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
      dark: "#f8961e",
    },
  },
});

const NewPlaces = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const user = useContext(AuthContext);
  const history = useHistory();
  const { error, isLoading, sendRequest, setError } = useHttpClient();
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/`, "POST", formData, {
        Authorization: `Bearer ${user.token}`,
      });

      history.push("/");
    } catch (err) {}
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingSpinner />}
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
            {error && (
              <ErrorAlert
                open={error}
                setOpen={() => {
                  setError(false);
                }}
              />
            )}
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%", pr: "1rem" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formSubmitHandler}
            >
              <ImageUpload id="image" onInput={inputHandler} />
              <Input
                id="title"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                error={"This field should not be empty."}
                onInput={inputHandler}
              />
              <Input
                id="description"
                type="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                error={"Please enter a valid description (at least 5 characters)."}
                onInput={inputHandler}
              />
              <Input
                id="address"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                error={"This field should not be empty."}
                onInput={inputHandler}
              />
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formState.isValid}
                  sx={{ width: "100%" }}
                >
                  Add Place
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default NewPlaces;
