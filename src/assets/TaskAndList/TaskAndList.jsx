import React, { useState, useEffect } from "react";
import "./TaskAndList.css";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Grid,
  Box,
  Slide,
} from "@mui/material";
import Sidenav from "../layout/Sidenav";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TaskCard = ({ title, onDelete, onAddSubtask }) => {
  const [openSubtaskDialog, setOpenSubtaskDialog] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const containerRef = React.useRef(null);

  const handleSubtaskDialogOpen = () => {
    setOpenSubtaskDialog(true);
  };

  const handleSubtaskDialogClose = () => {
    setOpenSubtaskDialog(false);
  };

  const handleSubtaskTitleChange = (event) => {
    setSubtaskTitle(event.target.value);
  };

  // const handleCreateSubtask = () => {
  //   if (subtaskTitle.trim() !== "") {
  //     setSubtasks([...subtasks, subtaskTitle]);
  //     setSubtaskTitle("");
  //     setOpenSubtaskDialog(false);
  //   }
  // };

  return (
    <div className="card" ref={containerRef}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Subtasks:
        </Typography>
        <List sx={{ listStyleType: "disc" }}>
          {subtasks.map((subtask, index) => (
            <ListItem key={index}>
              <ListItemText sx={{ fontSize: 10 }} primary={subtask} />
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Subtask Dialog */}
      <Dialog
        open={openSubtaskDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleSubtaskDialogClose}
      >
        <DialogTitle>Create Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subtaskTitle"
            label="Subtask Title"
            type="text"
            fullWidth
            value={subtaskTitle}
            onChange={handleSubtaskTitleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubtaskDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onAddSubtask} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Subtask Button */}
      <CardActions style={{ marginTop: "auto" }}>
        <div className="flex gap-3">
          <Button
            className="delete-but"
            variant="contained"
            color="primary"
            onClick={handleSubtaskDialogOpen}
          >
            Create Subtask
          </Button>
          <Button
            className="delete-but"
            variant="contained"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
        {/* <Slide in={checked} container={containerRef.current}>
          {Dialog}
        </Slide> */}
      </CardActions>
    </div>
  );
};

{
  //Main card creation
}

export const TaskAndList = (
  setSubtasks,
  setSubtaskTitle,
  setOpenSubtaskDialog,
  subtaskTitle,
  subtasks
) => {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleTaskDialogOpen = () => {
    setOpenTaskDialog(true);
  };

  const handleTaskDialogClose = () => {
    setOpenTaskDialog(false);
  };

  const handleTaskTitleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:30001/cards");
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await fetch(`http://localhost:30001/cards/delete/${cardId}`, {
        method: "DELETE",
        ...window.location.reload(false),
      });
      const updatedCards = cards.filter((card) => card.id !== cardId);
      setCards(updatedCards);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCreateCard = async () => {
    try {
      const response = await fetch("http://localhost:30001/cards/card/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setCards([...cards, data]);
      setOpenTaskDialog(false);
      setName("");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  {
    /* 
    Subtask Functions
    */
  }

  {
    //Card related CSS
  }
  return (
    <>
      <Sidenav open={openDrawer} onClose={toggleDrawer} />
      <Box>
        <Grid
          container
          gap={10}
          sx={{ marginTop: "120px", marginLeft: "200px" }}
        >
          {cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <TaskCard
                title={card.name}
                onDelete={() => deleteCard(card._id)}
                onAddSubtask={() => handleCreateSubtask(card._id)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Create Task button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleTaskDialogOpen}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          Create Task
        </Button>

        {/* Task Dialog */}
        <Dialog
          open={openTaskDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleTaskDialogClose}
        >
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="taskTitle"
              label="Task Title"
              type="text"
              fullWidth
              value={name}
              onChange={handleTaskTitleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTaskDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateCard} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
