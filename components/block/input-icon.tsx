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
}

export default function InputIcon({ Icon, type, placeholder, value, name, onChange }: InputIconProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <div className="relative w-full text-gray-500">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon size={18} />
            </span>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className="pl-10"
            />
        </div>
    );
}
