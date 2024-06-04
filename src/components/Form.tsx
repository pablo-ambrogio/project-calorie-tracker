import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import useActivity from "../hooks/useActivity";

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    activity: "",
    calories: 0,
};

export const Form = () => {
    const [activityState, setActivityState] = useState<Activity>(initialState);

    const { state, dispatch } = useActivity();

    useEffect(() => {
        if (state.activeId) {
            console.log("Tenemos ID");
            setActivityState(
                state.activities.filter((act) => act.id === state.activeId)[0]
            );
        }
    }, [state.activeId]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value, id } = e.target;
        const isNumberField = ["category", "calories"].includes(id);

        setActivityState({
            ...activityState,
            [id]: isNumberField ? +value : value,
        });
    };

    const isValidActivityState = () => {
        const { activity, calories } = activityState;
        return activity.trim() !== "" && calories > 0;
    };

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: "save-activity",
            payload: { newActivity: activityState },
        });

        setActivityState({
            ...initialState,
            id: uuidv4(),
        });
    };

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSumbit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">
                    Category:
                </label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activityState.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">
                    Activity:
                </label>
                <input
                    type="text"
                    id="activity"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Example: Meal, Orange juice, Salad, Exercise, Bicycle, etc."
                    value={activityState.activity}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">
                    Calories:
                </label>
                <input
                    type="number"
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories, example: 300, 600, etc."
                    value={activityState.calories}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value={`${
                    activityState.category === 1 ? "save meal" : "save exercise"
                }`}
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:bg-gray-300"
                disabled={!isValidActivityState()}
            />
        </form>
    );
};
