import { Role } from "./Role";

interface User {
	id?: number,
	email: string,
	username: string,
	full_name: string,
	first_name: string,
	last_name: string,
	password: string,
	is_active?: boolean,
	role: Role,
	created_at?:Date
}
