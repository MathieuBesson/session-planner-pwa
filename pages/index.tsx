import Loader from "@/components/block/loader";
import SessionPreview from "@/components/block/session-preview";
import { useHalls, useSessionTypes, useSessions } from "@/components/hooks/api-request";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LuPlusCircle } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import 'moment/locale/fr';
import { Roles } from "@/enums/roles";

const SessionList: React.FC = () => {
    const router = useRouter()
    const { data: sessions, isLoading: isLoadingSession, isError: isErrorSession } = useSessions();
    const { data: halls, isLoading: isLoadingHalls, isError: isErrorHalls } = useHalls();
    const { data: sessionTypes, isLoading: isLoadingSessionTypes, isError: isErrorSessionTypes } = useSessionTypes();
    const { data: session, status } = useSession()


    if (isLoadingSession && isLoadingHalls && isLoadingSessionTypes) {
        return <Loader />;
    }

    if (isErrorSession || isErrorHalls || isErrorSessionTypes) {
        return router.push('error');
    }

    const getHallById = (hallId: number) => {
        return halls.find((hall: any) => hall.id === hallId)
    }

    const getSessionTypeById = (sessionTypeId: number) => {
        return sessionTypes.find((sessionType: any) => sessionType.id === sessionTypeId)
    }

    return (
        <>
            <div className="flex justify-end gap-3 mb-5">
                {
                    session?.user.roleId === Roles.ADMIN &&
                    <>
                        <button onClick={() => router.push('/session/create')}>
                            <LuPlusCircle size={30} />
                        </button>
                        <button onClick={() => router.push('/users')}>
                            <MdOutlinePeopleAlt size={30} />
                        </button>
                    </>
                }
                <button onClick={() => signOut({ callbackUrl: '/login', redirect:true })}>
                    <TbLogout size={30} />
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-2">Sessions à venir</h1>
            <h2 className="text-md text-gray-500 mb-5">Inscription possible une semaine avant la session.</h2>
            {sessions && halls && sessionTypes && sessions.map((session: any) =>

                <SessionPreview
                    key={session.id}
                    id={session.id}
                    name={session.name}
                    date={session.date}
                    salle={getHallById(session.hallId).name}
                    startTime={session.startTime}
                    endTime={session.endTime}
                    sessionType={getSessionTypeById(session.sessionTypeId).name}
                    note={session.note}
                    users={session.users}
                    maxCapacity={session.maxCapacity}
                    delayBeforeRegistration={session.delayBeforeRegistration}
                    cancelled={session.cancelled}
                />
            )}
        </>
    );
}

export default SessionList