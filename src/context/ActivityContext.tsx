import { ReactNode, createContext, useMemo, useReducer } from "react";
import {
    ActivityActions,
    ActivityState,
    activityReducer,
    initialState,
} from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
    children: ReactNode;
};

type ActivityContextProps = {
    state: ActivityState;
    dispatch: React.Dispatch<ActivityActions>;
    caloriesConsumed: number;
    excerciseBurned: number;
    netCalories: number;
    categoryName: (category: Activity["category"]) => string[];
    isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    const caloriesConsumed = useMemo(
        () =>
            state.activities.reduce(
                (total, activity) =>
                    activity.category === 1 ? total + activity.calories : total,
                0
            ),
        [state.activities]
    );

    const excerciseBurned = useMemo(
        () =>
            state.activities.reduce(
                (total, activity) =>
                    activity.category === 2 ? total + activity.calories : total,
                0
            ),
        [state.activities]
    );

    const netCalories = useMemo(
        () => caloriesConsumed - excerciseBurned,
        [state.activities]
    );

    const categoryName = useMemo(
        () => (category: Activity["category"]) =>
            categories.map((cat) => (cat.id === category ? cat.name : "")),
        [state.activities]
    );

    const isEmptyActivities = useMemo(
        () => state.activities.length === 0,
        [state.activities]
    );

    const data = {
        state,
        dispatch,
        caloriesConsumed,
        excerciseBurned,
        netCalories,
        categoryName,
        isEmptyActivities,
    };

    return (
        <ActivityContext.Provider value={data}>
            {children}
        </ActivityContext.Provider>
    );
};
