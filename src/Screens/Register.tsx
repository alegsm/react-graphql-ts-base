import * as React from "react";
import FlexView from "react-flexview/lib/FlexView";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import { Mutation } from "react-apollo";
import { REGISTER_MUTATION } from "../GRAPHQL/Mutations/RegisterMutation";
import RegisterForm from "../Components/RegisterForm";
import { AuthError, AuthResponse } from "../GRAPHQL/sharedTypes";
import {ErrorDialog} from "../Components/ErrorDialog";
import {AuthHandlerIsLoggedIn, AuthHandlerLogUser} from "../AUTH/AuthHandler";

const styles: any = (theme: any) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 20
  }
});

interface RegisterProps {
  classes: any;
  history: any;
}

interface LoginState {
  loading: boolean;
  username: string;
  password: string;
  errors: AuthError[];
  showErrorDialog: boolean;
  confirmPassword: string;
}

class Register extends React.Component<RegisterProps, LoginState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      errors: [],
      showErrorDialog: false,
      loading: false,
      username: "",
      password: "",
      confirmPassword: ""
    };
  }

  componentWillMount() {
      if(AuthHandlerIsLoggedIn()) {
        this.props.history.push('/home');
      }
  }

  render() {
    const { username, password } = this.state;
    const submitButton = (doRegister: any) => {
      return (
        <FlexView hAlignContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit.bind(this, doRegister)}
            className={this.props.classes.button}>
            Crear cuenta
          </Button>
        </FlexView>
      );
    };

    return (
      <FlexView hAlignContent="center" vAlignContent="center">
        <FlexView column>
          <RegisterForm
            confirmPassword={this.state.confirmPassword}
            password={this.state.password}
            username={this.state.username}
            onConfirmPasswordChange={
              this.handleConfirmPasswordChange.bind(this)}
            onPasswordChange={this.handlePasswordChange.bind(this)}
            onUsernameChange={this.handleUsernameChange.bind(this)}
          />

          <Mutation
            mutation={REGISTER_MUTATION}
            variables={{ username, password }}
            onError={error => {
              this.showError(undefined, error.message);
            }}>
            {mutate => submitButton(mutate)}
          </Mutation>
        </FlexView>
        <ErrorDialog
            open={this.state.showErrorDialog}
            handleClose={() => {this.setState({
                showErrorDialog: false
            })}}
            title="Ha ocurrido un error"
            errors={this.state.errors}
        />
      </FlexView>
    );
  }

  handleUsernameChange(event: any) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event: any) {
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmPasswordChange(event: any) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  async handleSubmit(doRegister: any) {
    if (this.state.confirmPassword === this.state.password) {
      const { data } = await doRegister();
      if (data.register) {
        this.handleResponse(data.register as AuthResponse);
      }
    }
  }

  handleResponse(response: AuthResponse) {
    if (response.token) {
        AuthHandlerLogUser(this.props.history, response.token);
    } else {
      this.showError(response.errors);
    }
  }

  showError(errors?: AuthError[], message?: string) {
    let errorsForShow: AuthError[] = [
      {
        path: "General",
        message: message ? message : "An error has occurred"
      }
    ];

    if (errors) {
      errorsForShow = errors;
    }
    this.setState({
      errors: errorsForShow,
      showErrorDialog: true
    });
  }
}

export default withStyles(styles)(Register);
