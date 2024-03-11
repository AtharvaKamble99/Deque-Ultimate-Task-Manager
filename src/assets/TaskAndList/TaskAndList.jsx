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

const TaskCard = ({ title, onDelete }) => {
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

  const handleCreateSubtask = () => {
    if (subtaskTitle.trim() !== "") {
      setSubtasks([...subtasks, subtaskTitle]);
      setSubtaskTitle("");
      setOpenSubtaskDialog(false);
    }
  };

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
          <Button onClick={handleCreateSubtask} color="primary">
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

export const TaskAndList = () => {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleTaskDialogOpen = () => {
    setOpenTaskDialog(true);
  };

  const handleTaskDialogClose = () => {
    setOpenTaskDialog(false);
  };

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleCreateTask = () => {
    if (taskTitle.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        subtasks: [],
      };
      setTasks([...tasks, newTask]);
      setTaskTitle("");
      setOpenTaskDialog(false);
    }
  };
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  // console.log(Sidenav)
  return (
    <>
      <Sidenav open={openDrawer} onClose={toggleDrawer} />
      <Box>
        <Grid
          container
          gap={10}
          sx={{ marginTop: "120px", marginLeft: "200px" }}
        >
          {tasks.map((task, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <TaskCard
                title={task.title}
                onDelete={() => deleteTask(task.id)}
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
              value={taskTitle}
              onChange={handleTaskTitleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTaskDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateTask} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
// const mongoose = require("mongoose");

// // Define the card property schema
// const cardPropertySchema = new mongoose.Schema({
//   tlx: { type: Number, required: true },
//   tly: { type: Number, required: true },
//   height: { type: Number, required: true },
//   width: { type: Number, required: true },
// });

// // Define the schema for image cards
// const imagecardSchema = new mongoose.Schema({
//   imageURL: String,
//   cardProperties: cardPropertySchema,
// });

// // Define the schema for text cards
// const textcardSchema = new mongoose.Schema({
//   text: String,
//   cardProperties: cardPropertySchema,
// });

// // Define the schema for tasks within todo lists
// const taskSchema = new mongoose.Schema({
//   // card : ObjectId (Initially Null)
//   task: { String, required: true },
//   checked: { Boolean, required: true },
// });

// // Define the schema for todo list cards
// const todolistcardSchema = new mongoose.Schema({ //CARD
      //Add title(of card)
//   todolist: [taskSchema],
//   cardProperties: cardPropertySchema,
// });

// // Define the schema for the card model
// const cardSchema = new mongoose.Schema(
//   {
//     // add title
//     parent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
//     editor: [{ type: String }],
//     access: [{ type: String }],
//     cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
//     images: [imagecardSchema],
//     textboxes: [textcardSchema], 
//     todolists: [todolistcardSchema], 
//     cardProperties: cardPropertySchema,
//   },
//   {
//     toJSON: { virtuals: true }, // Ensure virtuals are included when document is converted to JSON
//     toObject: { virtuals: true }, // Ensure virtuals are included when document is converted to a plain JavaScript object
//   }
// );

// // Define virtual field for nested cards
// cardSchema.virtual("childrenCards", {
//   ref: "Card",
//   localField: "_id",
//   foreignField: "parentCard",
// });

// // Create the Card model
// const Card = mongoose.model("Card", cardSchema);

// module.exports = Card;
// const mongoose = require("mongoose");

// // Define the card property schema
// const cardPropertySchema = new mongoose.Schema({
//   tlx: { type: Number, required: true },
//   tly: { type: Number, required: true },
//   height: { type: Number, required: true },
//   width: { type: Number, required: true },
// });

// // Define the schema for image cards
// const imagecardSchema = new mongoose.Schema({
//   imageURL: String,
//   cardProperties: cardPropertySchema,
// });

// // Define the schema for text cards
// const textcardSchema = new mongoose.Schema({
//   text: String,
//   cardProperties: cardPropertySchema,
// });

// // Define the schema for tasks within todo lists
// const taskSchema = new mongoose.Schema({
//   // card : ObjectId (Initially Null)
//   task: { String, required: true },
//   checked: { Boolean, required: true },
// });

// // Define the schema for todo list cards
// const todolistcardSchema = new mongoose.Schema({
//   todolist: [taskSchema],
//   cardProperties: cardPropertySchema,
// });

// // Define the schema for the card model
// const cardSchema = new mongoose.Schema(
//   {
//     // add title
//     parent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
//     editor: [{ type: String }],
//     access: [{ type: String }],
//     cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
//     images: [imagecardSchema],
//     textboxes: [textcardSchema],
//     todolists: [todolistcardSchema],
//     cardProperties: cardPropertySchema,
//   },
//   {
//     toJSON: { virtuals: true }, // Ensure virtuals are included when document is converted to JSON
//     toObject: { virtuals: true }, // Ensure virtuals are included when document is converted to a plain JavaScript object
//   }
// );

// // Define virtual field for nested cards
// cardSchema.virtual("childrenCards", {
//   ref: "Card",
//   localField: "_id",
//   foreignField: "parentCard",
// });

// // Create the Card model
// const Card = mongoose.model("Card", cardSchema);

// module.exports = Card;