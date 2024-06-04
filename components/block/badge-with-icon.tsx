import { IconType } from "react-icons/lib";
import { Badge } from "../ui/badge";

export default function BadgeWithIcon({ Icon, children, color, suffix = null }: { Icon: IconType, children: string, suffix?: string | null, color: string }) {
    return (
        <Badge className={`flex w-fit rounded-lg py-1 px-2 text-sm mr-2 mb-3 ${color}`}>
            <div className={"flex"}>
                <Icon size={20} className={"mr-2"}></Icon>
                <span>
                    {children}
                </span>
                {suffix && <span className={"ml-3 font-normal"}>{suffix}</span>}
            </div>
        </Badge>
    )
}