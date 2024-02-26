import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText, CardActions, Grid, Box } from '@mui/material';
import   Sidenav  from '../layout/Sidenav';

const TaskCard = ({ title }) => {
  const [openSubtaskDialog, setOpenSubtaskDialog] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);

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
    if (subtaskTitle.trim() !== '') {
      setSubtasks([...subtasks, subtaskTitle]);
      setSubtaskTitle('');
      setOpenSubtaskDialog(false);
    }
  };

  return (
    <Card
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.4), 0px 4px 5px 0px rgba(0, 0, 0, 0.3), 0px 1px 10px 0px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        maxWidth: 200, // Adjust width here
        justifyContent:'center'
      }}
    >
      <CardHeader
        title={title}
      />
      <CardContent>
      <Typography variant="subtitle1" gutterBottom>
          Subtasks:
        </Typography>
        <List sx={{ listStyleType: 'disc' }}>
          {subtasks.map((subtask, index) => (
            <ListItem key={index}>
              <ListItemText sx={{fontSize:10}} primary={subtask} />
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Subtask Dialog */}
      <Dialog open={openSubtaskDialog} onClose={handleSubtaskDialogClose}>
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
      <CardActions style={{ marginTop: 'auto' }}>
        <Button variant="contained" color="primary" onClick={handleSubtaskDialogOpen}>
          Create Subtask
        </Button>
      </CardActions>
    </Card>
  );
};

export const TaskAndList = () => {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
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
    if (taskTitle.trim() !== '') {
      setTasks([...tasks, { title: taskTitle, subtasks: [] }]);
      setTaskTitle('');
      setOpenTaskDialog(false);
    }
  };
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  // console.log(Sidenav)
  return (
    <>
    <Sidenav open={openDrawer} onClose={toggleDrawer} />
    <Box>
      <Grid container gap={3} sx={{marginTop:'120px', marginLeft:'200px'}}>
        {tasks.map((task, index) => (
          <Grid item key={index} xs={12} sm={6} md={2} >
            <TaskCard title={task.title} />
          </Grid>
        ))}
      </Grid>
    
      {/* Create Task button */}
      <Button variant="contained" color="primary" onClick={handleTaskDialogOpen} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        Create Task
      </Button>

      {/* Task Dialog */}
      <Dialog open={openTaskDialog} onClose={handleTaskDialogClose}>
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
