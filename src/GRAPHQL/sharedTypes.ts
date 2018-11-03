export class AuthError {
    path: string;
    message: string;
}

export class AuthResponse {
    errors: AuthError[];
    token: string;
}
