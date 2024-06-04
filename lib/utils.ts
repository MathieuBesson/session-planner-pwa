import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { HiOutlineTag } from 'react-icons/hi';
import moment, { Moment } from 'moment';
import { SessionStatusBadgeInfo } from "@/types/session-status-badge-info";
import { SessionStatus } from "@/enums/session-status";
import { TbFlagOff } from "react-icons/tb";
import { TbForbidFilled } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa";
import { TbLockOpen2 } from "react-icons/tb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(s: string)
{
    return s[0].toUpperCase() + s.slice(1);
}

export function getStatus(
  dateString: string,
  delayBeforeRegistration: number,
  cancelled: boolean,
  usersNumber: number,
  maxCapacity: number
): SessionStatusBadgeInfo | null {

  const startRegistrationDate = moment(dateString).subtract(delayBeforeRegistration, 'd');
  const today = moment();
  const date = moment(dateString);

  console.log(date, today, startRegistrationDate)
  console.log(today < startRegistrationDate)

  switch (true) {
    case cancelled === true:
      return {
        icon: TbFlagOff,
        color: "bg-red-500",
        label: "Annulé",
        id: SessionStatus.CANCEL
      }

    case usersNumber >= maxCapacity:
      return {
        icon: TbForbidFilled,
        color: "bg-red-500",
        label: "Complet",
        id: SessionStatus.COMPLETE
      }

    case today < startRegistrationDate:
      return {
        icon: FaRegClock,
        color: "bg-blue-500",
        label: "À venir",
        id: SessionStatus.FUTURE
      }

    case startRegistrationDate <= today && today <= date:
      return {
        icon: TbLockOpen2,
        color: usersNumber >= ((3 / 4) * maxCapacity) ? "bg-orange-500" : "bg-green-500",
        label: "Ouvert",
        id: SessionStatus.OPEN
      }

    case today > date:
      return {
        icon: TbForbidFilled,
        color: "bg-gray-500",
        label: "Terminé",
        id: SessionStatus.FINISH
      }
  }
  return null;
}

export function convertSecondsToHoursMinutes(seconds: number) {
  const duration = moment.duration(seconds, 'seconds');
  const hours = duration.hours();
  const minutes = duration.minutes();

  return hours + "h" + (minutes !== 0 ? minutes : "")
}