import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, WithStyles } from "@material-ui/core";
import FlexView from "react-flexview/lib/FlexView";

const styles: any = (theme: any) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    errorMessage: {
      color: "red",
      fontSize: 12
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 20
    }
  });

interface RegisterFormProps extends WithStyles<typeof styles> {
  username: string;
  password: string;
  confirmPassword: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const showErrorMessage =
    props.confirmPassword.length > 0 &&
    props.confirmPassword !== props.password;
  return (
    <FlexView column hAlignContent="center">
      <div className={props.classes.title}>Registro</div>
      <TextField
        id="register-email"
        label="Email"
        className={props.classes.textField}
        value={props.username}
        onChange={props.onUsernameChange}
        margin="normal"
      />
      <TextField
        id="register-password"
        label="Password"
        className={props.classes.textField}
        value={props.password}
        type="password"
        onChange={props.onPasswordChange}
        margin="normal"
      />
      <TextField
        id="register-confirm-password"
        label="Confirm password"
        type="password"
        className={props.classes.textField}
        value={props.confirmPassword}
        onChange={props.onConfirmPasswordChange}
        margin="normal"
      />
      {showErrorMessage ? (
        <FlexView hAlignContent="center">
          <span className={props.classes.errorMessage}>
            Las contraseñas deben coincidir.
          </span>
        </FlexView>
      ) : null}
    </FlexView>
  );
};

export default withStyles(styles)(RegisterForm);
