import { RootState, useSelector } from "../redux/store";


const useRole = () => {
    const useRole = useSelector(
        (state: RootState) => state.roles
    )
    return useRole;
};
export default useRole;
