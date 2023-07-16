import React, { useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Input from "../../shared/components/UIElements/Input";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "@mui/material/Button";
import ImageUpload from "../../shared/components/UIElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";

import { useHttpClient } from "../../shared/hooks/http-hook";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
      dark: "#f8961e",
    },
  },
});
const Auth = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, setError } = useHttpClient();
  const auth = useContext(AuthContext);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("username", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorAlert
          open={error}
          setOpen={() => {
            setError(null);
          }}
        />
      )}
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
              onSubmit={formSubmitHandler}
            >
              <h1 style={{ marginLeft: "25%", marginBottom: "1.5rem" }}>
                {isLoginMode ? "Login" : "Signup"} Required
              </h1>

              {!isLoginMode ? (
                <>
                  <ImageUpload id="image" onInput={inputHandler} />
                  <Input
                    id="name"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    error={"This field should not be empty."}
                    onInput={inputHandler}
                  />
                </>
              ) : null}
              <Input
                id="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                error={"Please enter a valid email address."}
                onInput={inputHandler}
              />
              <Input
                id="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                error={"Please enter a valid password, atleast 6 characters."}
                onInput={inputHandler}
              />
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formState.isValid}
                  sx={{ width: "100%" }}
                >
                  {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
              </Grid>
            </Box>
            <Grid item sx={{ m: 1, width: "100%", pr: "1rem" }}>
              <Button
                color="info"
                type="submit"
                variant="contained"
                sx={{ width: "100%" }}
                onClick={switchModeHandler}
              >
                {isLoginMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
