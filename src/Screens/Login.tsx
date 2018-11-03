import * as React from "react";
import FlexView from "react-flexview/lib/FlexView";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import LoginForm from "../Components/LoginForm";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../GRAPHQL/Mutations/LoginMutation";
import { AuthError, AuthResponse } from "../GRAPHQL/sharedTypes";
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

interface LoginProps {
  classes: any;
  history: any;
}

interface LoginState {
  loading: boolean;
  username: string;
  password: string;
  errors: AuthError[];
  showErrorDialog: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      errors: [],
      showErrorDialog: false,
      loading: false,
      username: "",
      password: ""
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
            Iniciar sesion
          </Button>
        </FlexView>
      );
    };
    return (
      <FlexView hAlignContent="center" vAlignContent="center">
        <FlexView column>
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            onUsernameChange={this.handleUsernameChange.bind(this)}
            onPasswordChange={this.handlePasswordChange.bind(this)}
          />
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ username, password }}
            onError={error => {
              this.showError(undefined, error.message);
            }}>
            {mutate => submitButton(mutate)}
          </Mutation>
        </FlexView>
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

  async handleSubmit(doRegister: any) {
    const { data } = await doRegister();
    if (data.login) {
      this.handleResponse(data.login as AuthResponse);
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

export default withStyles(styles)(Login);
