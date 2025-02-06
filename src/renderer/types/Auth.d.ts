import { Organization } from "./Organization"

export interface UserSignUp {
    username: string,
    password: string,
    email: string,
    organization: Organization
}

interface UserAuth {
    email: string,
    password: string
}