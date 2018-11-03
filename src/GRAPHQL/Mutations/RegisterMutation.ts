import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
    mutation RegisterMutation($username: String!, $password: String!) {
        register(email: $username, password: $password) {
            errors {
                path
                message
            }
            token
        }
    }

`;
