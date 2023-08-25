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
    value: props.value || "",
    isTouch: false,
    isValid: props.id === "date" ? !!props.value : props.initialIsValid || false,
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

  return (
    <ThemeProvider theme={theme}>
      <TextField
        id={id}
        label={props.label}
        color="primary"
        variant="standard"
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
        error={!isValid && inputReducerState.isTouch}
        helperText={!isValid && inputReducerState.isTouch ? props.error : null}
        InputLabelProps={props.type === "date" || props.type === "time" ? { shrink: true } : {}}
        multiline={props.type === "textarea"}
        maxRows={4}
      />
    </ThemeProvider>
  );
};

export default Input;
