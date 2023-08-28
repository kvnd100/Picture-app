import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const ModalElement = (props) => {
  const handleClose = () => props.setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        {props.type ? null : props.children}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description ? props.description : ""}
        </Typography>
        {props.type ? props.children : null}
      </Box>
    </Modal>
  );
};

export default ModalElement;
