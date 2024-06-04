import { Input } from "../ui/input";
import { useRef, useState } from "react";
import moment from "moment";

interface DayTimeInputProps {
    value: number;
    onChange: (value: number) => void;
}

export default function DayTimeInput({ value, onChange }: DayTimeInputProps) {
    const hourInputRef = useRef(null);
    const minutInputRef = useRef(null);
    // const [seconds, setSeconds] = useState<number>(value);

    const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hoursInSeconds = moment.duration(event.target.value, 'hours');
        const minutesInSeconds = moment.duration(minutInputRef.current.value, 'minutes');
        onChange(hoursInSeconds.asSeconds() + minutesInSeconds.asSeconds());
    };

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hoursInSeconds = moment.duration(hourInputRef.current.value, 'hours');
        const minutesInSeconds = moment.duration(event.target.value, 'minutes');
        onChange(hoursInSeconds.asSeconds() + minutesInSeconds.asSeconds());
    };


    function convertSecondsToHoursMinutes(seconds: number) {
        const duration = moment.duration(seconds, 'seconds');
        const hours = duration.hours();
        const minutes = duration.minutes();

        return { hours, minutes }
    }

    // console.log(seconds, value)
    const { hours, minutes } = convertSecondsToHoursMinutes(value);
    // console.log(hours, minutes, value)
    // const minutesValue = minutes ? minutes.substring(0, minutes.length - 1) : "00";

    return (
        <div className={"flex gap-4"}>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <span className={"text-sm"}>Heures</span>
                <Input
                    min={0}
                    max={23}
                    ref={hourInputRef}
                    type='number'
                    value={hours}
                    onChange={handleHoursChange}
                    placeholder='00'
                    className="text-center placeholder:text-center w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
            <div className={"flex flex-col justify-center items-center gap-2"}>
                <span className={"text-sm"}>Minutes</span>
                <Input
                    min={0}
                    max={59}
                    type='number'
                    ref={minutInputRef}
                    value={minutes}
                    onChange={handleMinutesChange}
                    placeholder='00'
                    className="text-center placeholder:text-center w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
        </div>
    );
}
