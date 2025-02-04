import { RootState, useSelector } from "../redux/store";


const useTasks = () => {
    const useTasks = useSelector(
        (state: RootState) => state.tasks
    )
    return useTasks;
};
export default useTasks;
