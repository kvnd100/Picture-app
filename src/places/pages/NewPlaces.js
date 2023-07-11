import React from "react";
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

const NewPlaces = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

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
              onSubmit={formSubmitHandler}
            >
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
