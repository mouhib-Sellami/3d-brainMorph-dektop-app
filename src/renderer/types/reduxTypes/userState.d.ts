import {  User } from "../User";

interface userState extends BaseState {
    users: Array<User>;
}