import { SessionStatus } from "@/enums/session-status"
import { IconType } from "react-icons/lib"

export type SessionStatusBadgeInfo = {
    icon: IconType,
    color: string,
    label: string,
    id: SessionStatus
}