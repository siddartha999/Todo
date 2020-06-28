import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Emitter from "../services/Emitter";

export default function ConfirmationDialog(props) {
  const [open, setOpen] = useState(false);
  const dialogContent = useRef(null);
  const actionTextObj = props.actionText || {
    affirmative: "Ok",
    negative: "Cancel",
  };
  const callSuccessHandler = useRef(null);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    callSuccessHandler.current();
    setOpen(false);
  };

  Emitter.on("DISPLAY_CONFIRMATION_DIALOG", ({ content, handler }) => {
    dialogContent.current = content;
    callSuccessHandler.current = handler;
    setOpen(true);
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>{dialogContent.current}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            {actionTextObj.negative}
          </Button>
          <Button onClick={handleSuccess} color="primary" autoFocus>
            {actionTextObj.affirmative}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
