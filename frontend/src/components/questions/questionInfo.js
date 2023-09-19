import '../../App.css';
import React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function QuestionInfo({ open, handleClose, question, handleDelete }) {
  // if there is no selected question, return null
  if (question === undefined) {
    return null;
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        {/* Question title */}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {question.title}
        </DialogTitle>

        {/* Rest of question contents in dialog box */}
        <DialogContent dividers>
        <Typography gutterBottom>
            ID: {question.id}
          </Typography>
          <Typography gutterBottom>
            {question.description}
          </Typography>
          <Typography gutterBottom>
            Category: {question.category}
          </Typography>
          <Typography gutterBottom>
            Complexity: {question.complexity}
          </Typography>
        </DialogContent>

        {/* Action buttons in bottom right of the dialog */}
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>

          <Button color="error"
            onClick={() => {
              handleDelete(question.id);
              handleClose();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default QuestionInfo;
