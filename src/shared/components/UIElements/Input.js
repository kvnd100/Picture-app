import React, { useReducer, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { validate } from "../../util/validators";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
    },
  },
});

const inputFunction = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputReducerState, dispatch] = useReducer(inputFunction, {
    value: props.initialValue || "",
    isTouch: false,
    isValid: props.initialIsValid || false,
  });

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", value: event.target.value, validators: props.validators });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const { id, onInput } = props;
  const { value, isValid } = inputReducerState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [isValid, value, id, onInput]);

  if (props.type === "textarea") {
    return (
      <ThemeProvider theme={theme}>
        <TextField
          id="standard-basic"
          label={props.label}
          color="primary"
          variant="standard"
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputReducerState.value}
          error={!inputReducerState.isValid && inputReducerState.isTouch}
          helperText={!inputReducerState.isValid && inputReducerState.isTouch ? props.error : null}
          multiline
          maxRows={4}
        />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="standard-basic"
        label={props.label}
        color="primary"
        variant="standard"
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputReducerState.value}
        error={!inputReducerState.isValid && inputReducerState.isTouch}
        helperText={!inputReducerState.isValid && inputReducerState.isTouch ? props.error : null}
      />
    </ThemeProvider>
  );
};

export default Input;
