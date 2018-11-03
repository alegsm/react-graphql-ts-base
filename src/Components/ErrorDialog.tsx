import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { AuthError } from "../GRAPHQL/sharedTypes";

interface ErrorDialogProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  errors?: AuthError[];
  message?: string;
}

export const ErrorDialog = (props: ErrorDialogProps) => {
  let body = <div>Ha ocurrido un error</div>;
  let title = props.title;

  if (props.message) {
    body = <div>{props.message}</div>;
  } else if (props.errors) {
    body = (
      <div>
        {props.errors.map(error => {
          return (
            <div>
              <div>{error.path}</div>
              <div>{error.message}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title ? (
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      ) : null}
      <DialogContent>
          {body}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
