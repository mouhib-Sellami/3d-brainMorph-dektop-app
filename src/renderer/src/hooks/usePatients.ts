import { RootState, useSelector } from "../redux/store";


const usePatients = () => {
    const usePatients = useSelector(
        (state: RootState) => state.patients
    )
    return usePatients;
};
export default usePatients;
