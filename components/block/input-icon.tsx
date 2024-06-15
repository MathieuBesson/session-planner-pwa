import { IconType } from "react-icons/lib"
import { Input } from "../ui/input"
import { useState } from "react";

type InputIconProps = {
    Icon: IconType,
    type: string,
    placeholder: string,
    value: string,
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    primary?: boolean
}

export default function InputIcon({ Icon, type, placeholder, value, name, onChange, primary = true }: InputIconProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    const textColor = primary === true ? "gray-500" : "black"
    const bgColor = primary === true ? "transparent" : "white"

    return (
        <div className={`relative w-full text-${textColor}`}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} />
            </span>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className={`pl-10 bg-${bgColor} placeholder-${textColor}`}
            />
        </div>
    );
}
