import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TaskPage() {
    return <div>
       <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
  </div>;
}

export default TaskPage;
