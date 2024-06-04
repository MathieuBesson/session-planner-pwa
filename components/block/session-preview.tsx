import {
  CardTitle,
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { HiOutlineClock, HiOutlineTag } from 'react-icons/hi';
import { MdOutlineCalendarMonth, MdOutlinePlace } from 'react-icons/md';
import BadgeWithIcon from './badge-with-icon';
import IndicationWithIcon from './indication-with-icon';
import SwitchRegister from './switch-register';
import { useRouter } from 'next/router';
import { capitalize, convertSecondsToHoursMinutes, getStatus } from '@/lib/utils';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SessionStatus } from '@/enums/session-status';

type SessionInput = {
  id: number,
  name: string,
  date: string,
  salle: string,
  startTime: number,
  endTime: number,
  sessionType: string,
  note: string,
  users: any[],
  maxCapacity: number,
  delayBeforeRegistration: number,
  cancelled: boolean
}

export default function SessionPreview({ id, name, date, salle, startTime, endTime, sessionType, note, users, maxCapacity, delayBeforeRegistration, cancelled }: SessionInput) {

  const userId = 1;
  const [usersCurrent, setUsersCurrent] = useState(users);

  const sessionStatusBadgeInfo = getStatus(
    date,
    delayBeforeRegistration,
    cancelled,
    users.length,
    maxCapacity
  );

  function isOwnRegistered(): boolean {
    return users.find(user => user.id === userId) !== undefined;
  }

  const router = useRouter();
  return (
    <Card className="w-full mb-7">
      <button onClick={() => router.push(`/session/${id}`)}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </button>
      <CardContent>
        <div className={""}>
          <div className={"flex flex-col sm:flex-row"}>
            <IndicationWithIcon Icon={MdOutlineCalendarMonth}>{capitalize(moment(date).locale('fr').format('dddd D MMMM'))}</IndicationWithIcon>
            <IndicationWithIcon Icon={HiOutlineClock}>
              {convertSecondsToHoursMinutes(startTime)} - {convertSecondsToHoursMinutes(endTime)}
            </IndicationWithIcon>
          </div>
          <div className={"flex mb-2 flex-col sm:flex-row"}>
            <IndicationWithIcon Icon={MdOutlinePlace}>{capitalize(salle)}</IndicationWithIcon>
            <IndicationWithIcon Icon={HiOutlineTag}>{capitalize(sessionType)}</IndicationWithIcon>
          </div>
        </div>
        <p className={"text-gray-500 mt-5 mb-5"}>{note}</p>
        {sessionStatusBadgeInfo &&
          <div className={"flex w-full flex-col sm:flex-row"}>
            <BadgeWithIcon
              Icon={sessionStatusBadgeInfo.icon}
              suffix={`${usersCurrent.length}/${maxCapacity}`}
              color={sessionStatusBadgeInfo.color}>
              {sessionStatusBadgeInfo.label}
            </BadgeWithIcon>
            {sessionStatusBadgeInfo.id === SessionStatus.OPEN &&
              <SwitchRegister users={usersCurrent} setUsers={setUsersCurrent} sessionId={id} ></SwitchRegister>
            }
          </div>
        }
      </CardContent>
    </Card>
  )
}