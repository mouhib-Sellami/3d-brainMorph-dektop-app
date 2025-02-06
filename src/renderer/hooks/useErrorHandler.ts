import { RootState, useSelector } from "../redux/store";


const useErrorHandler = () => {
    const useErrorHandler = useSelector(
        (state: RootState) => state.errorHandler
    )
    return useErrorHandler;
};
export default useErrorHandler;
