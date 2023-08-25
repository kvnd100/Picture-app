import React, { useContext, useState } from "react";
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
import { useLocation } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
      dark: "#f8961e",
    },
  },
});

const AddEvent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get("date");

  let formattedDate;

  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    formattedDate = `${year}-${month}-${day}`;
  }
  const [formState, inputHandler] = useForm(
    {
      date: { value: formattedDate, isValid: !!formattedDate },
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: true },
      time: { value: "", isValid: false },
    },
    !!formattedDate
  );
  console.log(formState);

  const user = useContext(AuthContext);
  const history = useHistory();
  const { error, isLoading, sendRequest, setError } = useHttpClient();
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const fullDateString = `${formState.inputs.date.value}T${formState.inputs.time.value}:00.000Z`;
      const dateObject = new Date(fullDateString);

      const eventData = {
        date: dateObject,
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(eventData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong.");
      }

      history.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong, please try again.");
    }
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
              <Input
                id="date"
                type="date"
                label="Date"
                validators={[VALIDATOR_REQUIRE()]}
                error={"This field should not be empty."}
                onInput={inputHandler}
                value={formattedDate}
              />
              <Input
                id="time"
                type="time"
                label="Time"
                validators={[VALIDATOR_REQUIRE()]}
                error={"This field should not be empty."}
                onInput={inputHandler}
                value={formState.inputs.time.value}
              />
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
                label="Address (Optional)"
                validators={[]}
                onInput={inputHandler}
                error={"Please enter a valid address."}
              />
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formState.isValid}
                  sx={{ width: "100%" }}
                >
                  Add Event
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AddEvent;
