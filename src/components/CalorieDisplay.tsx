type CalorieDisplayProp = {
    consumed: number;
    text: string;
};

export const CalorieDisplay = ({ consumed, text }: CalorieDisplayProp) => {
    return (
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-orange"> {consumed}</span>
            {text}
        </p>
    );
};
