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
        title: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 20
        }
    });

interface LoginFormProps extends WithStyles<typeof styles> {
    username: string;
    password: string;
    onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = (props: LoginFormProps) => {
    return (
        <FlexView column hAlignContent="center">
            <div className={props.classes.title}>Login</div>
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
        </FlexView>
    );
};

export default withStyles(styles)(LoginForm);
