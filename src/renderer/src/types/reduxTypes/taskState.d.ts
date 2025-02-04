import { Task } from "../Task";

interface taskState extends BaseState {
    tasks: Array<Task>;
}