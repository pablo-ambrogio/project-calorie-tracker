import { CalorieDisplay } from "./CalorieDisplay";
import useActivity from "../hooks/useActivity";

export const CaloriesTracker = () => {
    const { caloriesConsumed, excerciseBurned, netCalories } = useActivity();

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">
                Calorie summary
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay consumed={caloriesConsumed} text={"Consumed"} />
                <CalorieDisplay consumed={excerciseBurned} text={"Excercise"} />
                <CalorieDisplay consumed={netCalories} text={"Difference"} />
            </div>
        </>
    );
};
