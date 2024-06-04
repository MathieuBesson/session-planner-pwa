import { IconType } from "react-icons/lib"

export default function IndicationWithIcon({ Icon, children }: { Icon: IconType, children: any }) {
    return (
        <div className={"flex w-full sm:w-1/2 my-2 sm:my-0 items-center"}>
            <Icon size={20} color='#6B7280'></Icon>
            <span className={"ml-1 text-gray-500 text-md"}>{children}</span>
        </div>
    )
}