import BadgeWithIcon from "@/components/block/badge-with-icon";
import IndicationWithIcon from "@/components/block/indication-with-icon";
import { SearchCombobox } from "@/components/block/search-combobox";
import SwitchRegister from "@/components/block/switch-register";
import UserPreview from "@/components/block/user-preview";
import { Card } from "@/components/ui/card";
import { HiOutlineTag } from "react-icons/hi";
import { MdOutlineCalendarMonth, MdOutlinePlace } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { useRouter } from "next/router";
import { useOneSession, useRegisterUserToSession, useUnregisterUserFromSession } from "@/components/hooks/api-request";
import { capitalize, convertSecondsToHoursMinutes, getStatus } from "@/lib/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { SessionStatusBadgeInfo } from "@/types/session-status-badge-info";
import 'moment/locale/fr';
import { RiDeleteBinLine } from "react-icons/ri";
import { SessionStatus } from "@/enums/session-status";
import { Roles } from "@/enums/roles";
import { useSession } from "next-auth/react";

const SessionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [users, setUsers] = useState([]);
  const [userIdSelectedComboBox, setUserIdSelectedComboBox] = useState(null);
  const [sessionStatusBadgeInfo, setSessionStatusBadgeInfo] = useState<SessionStatusBadgeInfo | null>();
  const { data: sessionNext, status } = useSession()


  const { data: session, isLoading: isLoadingSession, isError: isErrorSession, get: getOneSession } = useOneSession(id as string, false);
  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    unregisterUserFromSession
  } = useUnregisterUserFromSession();

  const {
    isLoading: isLoadingCreate,
    error: errorCreate,
    registerUserToSession,
    data: sessionRegister
  } = useRegisterUserToSession();

  useEffect(() => {
    console.log(userIdSelectedComboBox)
    if (userIdSelectedComboBox) {
      const userAlreadyInSession = users.find(user => user.id === userIdSelectedComboBox) !== undefined;
      console.log(userAlreadyInSession)
      if (userAlreadyInSession === false) {
        registerUser(userIdSelectedComboBox)
        setUserIdSelectedComboBox(null);
      }

    }
  }, [userIdSelectedComboBox])

  useEffect(() => {
    if (sessionRegister) {
      setUsers(sessionRegister.users)
    }
  }, [sessionRegister])

  useEffect(() => {
    if (session) {
      setSessionStatusBadgeInfo(
        getStatus(
          moment(session.date),
          session.delayBeforeRegistration,
          session.cancelled,
          session.users.length,
          session.maxCapacity
        )
      )

      setUsers(session.users);
    }
  }, [session])

  useEffect(() => {
    if (id) {
      getOneSession(`sessions/${id}`);
    }
  }, [id])

  function removeUserById(userId: number) {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers)
  }

  const handleRemoveUser = async (userId) => {
    await unregisterUserFromSession(session.id, userId)
    removeUserById(userId)
  };

  const registerUser = async (userId: number) => {
    await registerUserToSession(session.id, userId)
  }

  return (
    <>
      {
        session &&
        <>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center justify-between">
              <button onClick={() => router.back()}>
                <MdKeyboardArrowLeft size={50} />
              </button>
              <h1 className={"text-3xl font-bold"}>{session.name}</h1>
            </div>
            {
              sessionNext?.user.roleId === Roles.ADMIN &&
              <button className="ml-5" onClick={() => router.push(`/session/${session.id}/edit`)}>
                <LuFileEdit size={30} />
              </button>
            }
          </div>
          <div>
            <div className={"flex flex-col sm:flex-row"}>
              <BadgeWithIcon Icon={HiOutlineTag} color={"bg-blue-500"}>
                {capitalize(session.sessionType.name)}
              </BadgeWithIcon>
              {sessionStatusBadgeInfo &&
                <BadgeWithIcon Icon={sessionStatusBadgeInfo.icon} color={sessionStatusBadgeInfo.color} suffix={`${users.length}/${session.maxCapacity}`}>
                  {sessionStatusBadgeInfo.label}
                </BadgeWithIcon>
              }
            </div>
            <Card className={"w-full flex flex-col sm:flex-row px-4 py-2 mb-4"}>
              <IndicationWithIcon Icon={MdOutlineCalendarMonth}>
                {capitalize(moment(session.date).locale('fr').format('dddd D MMMM'))}, {convertSecondsToHoursMinutes(session.startTime)} - {convertSecondsToHoursMinutes(session.endTime)}
              </IndicationWithIcon>
              <IndicationWithIcon Icon={MdOutlinePlace}>
                {session.hall.name}
              </IndicationWithIcon>
            </Card>
            {session.note &&
              <Card className={"w-full px-4 py-2 text-gray-500 mb-4 "}>
                {session.note}
              </Card>
            }
            {sessionStatusBadgeInfo && sessionStatusBadgeInfo.id === SessionStatus.OPEN &&
              <div className={"flex justify-start sm:justify-center mb-10"}>
                <SwitchRegister
                  sessionId={id}
                  users={users as []}
                  setUsers={setUsers}
                ></SwitchRegister>
              </div>
            }
            {sessionStatusBadgeInfo && sessionStatusBadgeInfo.id === SessionStatus.OPEN &&
              <Card className={"flex flex-col justify-center items-center w-full px-4 py-6 mb-4 "}>
                <h2 className={"font-bold text-xl mb-4"}>Liste des inscrits</h2>
                {
                  sessionNext?.user.roleId === Roles.ADMIN &&
                  <SearchCombobox setUserIdSelectedComboBox={setUserIdSelectedComboBox} ></SearchCombobox>
                }
                <div className={"flex flex-wrap flex-col sm:flex-row justify-center items-center sm:justify-start w-full max-w-md text-gray-500 mb-4"}>
                  {users.map(user =>
                    <div key={user.id} className={"flex sm:w-1/2 items-center my-2"}>
                      <UserPreview firstName={user.firstName} lastName={user.lastName}></UserPreview>
                      {
                        sessionNext?.user.roleId === Roles.ADMIN &&
                        <RiDeleteBinLine onClick={() => handleRemoveUser(user.id)} color='#EF4444' size={23} className={"ml-3"} />
                      }
                    </div>
                  )}
                </div>
              </Card>
            }
          </div>
        </>

      }
    </>
  )
}

export default SessionPage;