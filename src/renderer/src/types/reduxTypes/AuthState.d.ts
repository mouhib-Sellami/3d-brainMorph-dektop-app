import { Organization } from "../Organization";

type AuthState = {
    user: User | null;
    isError: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    message: string;
    permissions: Array<Permission>,
    organization: Organization | null
}
