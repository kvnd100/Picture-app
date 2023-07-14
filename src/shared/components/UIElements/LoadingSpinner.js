import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Classes from "./LoadingSpinner.module.css";
export const LoadingSpinner = () => {
  return (
    <div className={Classes.overlay}>
      <CircularProgress />
    </div>
  );
};
