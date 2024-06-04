import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

const useActivity = () => {
    const context = useContext(ActivityContext);

    if (!context) {
        throw new Error(
            "The useActivity hook must be used in an ActivityProvider"
        );
    }

    return context;
};
export default useActivity;
