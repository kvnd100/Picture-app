import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ErrorAlert from "./ErrorAlert";
import Alert from "@mui/material/Alert";
const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setpreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const imagePickerRef = useRef();

  const pickImageHandler = () => {
    imagePickerRef.current.click();
  };
  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const onChangeImageHandler = (event) => {
    let pickedFile;
    let fileIsValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <>
      {!isValid && props.error && <Alert severity="warning">{props.error}</Alert>}
      <div>
        {!isValid && <ErrorAlert />}
        <input
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          ref={imagePickerRef}
          onChange={onChangeImageHandler}
        />

        <Box
          sx={{
            display: "flex",
            "& > :not(style)": {
              m: "0 auto 1rem auto",
              width: 250,
              height: 250,
            },
          }}
        >
          <Paper sx={{ position: "relative" }}>
            {previewUrl ? (
              <img style={{ width: 250, height: 250 }} src={previewUrl} alt="Preview" />
            ) : (
              <p
                style={{
                  width: "11rem",
                  position: "absolute",
                  top: "50%",
                  left: "30%",
                  margin: "-25px 0px 0px -25px",
                }}
              >
                Please pick an Image.
              </p>
            )}
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            "& > :not(style)": {
              m: "1rem auto 0 auto",
              width: 250,
            },
          }}
        >
          <Button type="button" variant="contained" color="info" onClick={pickImageHandler}>
            Pick Image
          </Button>
        </Box>
      </div>
    </>
  );
};

export default ImageUpload;
