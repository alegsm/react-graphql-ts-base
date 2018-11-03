import {createHttpLink} from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const TOKEN_KEY = 'app-session-token';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(TOKEN_KEY);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        }
    }
});

export const authHandler = authLink.concat(httpLink);

export const AuthHandlerLogUser = (history: any, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    history.push('/home');
};

export const AuthHandlerIsLoggedIn = () => (!!localStorage.getItem(TOKEN_KEY));
