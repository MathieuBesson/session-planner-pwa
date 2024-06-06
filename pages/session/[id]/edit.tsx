import DatePicker from "@/components/block/date-picker";
import DayTimeInput from "@/components/block/day-time-input";
import InputIcon from "@/components/block/input-icon";
import SessionForm, { SessionData } from "@/components/block/session-form";
import { useHalls, useOneSession, useSessionTypes, useUpdateSession } from "@/components/hooks/api-request";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/components/ui/use-toast";
import withAuth from "@/components/with-auth";
import { Roles } from "@/enums/roles";
import { capitalize, convertSecondsToHoursMinutes } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { LuAlarmCheck } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdOutlinePlace } from "react-icons/md";

// interface SessionData {
//     sessionTypeId: number;
//     hallId: number;
//     startTime: number;
//     endTime: number;
//     maxCapacity: number;
//     name: string;
//     note: string;
//     date: string;
//     delayedBeforeRegistration: number;
// }

// const SessionEditPage: React.FC = () => {
//     const router = useRouter();
//     const { id } = router.query;

//     const { data: session, get: getOneSession } = useOneSession(id as string, false);
//     const { data: sessionUpdated, updateSession } = useUpdateSession();
//     const { data: halls } = useHalls();
//     const { data: sessionTypes } = useSessionTypes();

//     const [sessionData, setSessionData] = useState<SessionData>({
//         sessionTypeId: 0,
//         hallId: 0,
//         startTime: 0,
//         endTime: 0,
//         maxCapacity: 0,
//         name: "",
//         note: "",
//         date: "",
//         delayedBeforeRegistration: 0,
//     });

//     useEffect(() => {
//         if (id) {
//             getOneSession(`sessions/${id}`);
//         }
//     }, [id]);

//     useEffect(() => {
//         if (session) {
//             setSessionData({
//                 sessionTypeId: session.sessionTypeId,
//                 hallId: session.hallId,
//                 startTime: session.startTime,
//                 endTime: session.endTime,
//                 maxCapacity: session.maxCapacity,
//                 name: session.name,
//                 note: session.note || "",
//                 date: session.date.split("T")[0],
//                 delayedBeforeRegistration: session.delayBeforeRegistration,
//             });
//         }
//     }, [session]);

//     useEffect(() => {
//         console.log(sessionData)
//     }, [sessionData]);

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = event.target;
//         setSessionData({
//             ...sessionData,
//             [name]: value,
//         });
//     };

//     const handleInputNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const value = parseInt(event.target.value);
//         const name = event.target.name;
//         setSessionData({
//             ...sessionData,
//             [name]: value,
//         });
//     };

//     const handleSelectChange = (value: string, key: string) => {        
//         setSessionData({
//             ...sessionData,
//             [key]: Number(value),
//         });
//     };

//     const handleDateChange = (date: Date) => {
//         const dateAtNoon = new Date(date);
//         dateAtNoon.setHours(12, 0, 0, 0); // Définir l'heure à midi (12h00)
//         setSessionData({
//           ...sessionData,
//           date: dateAtNoon.toISOString().split("T")[0],
//         });
//       };

//     const handleStartTimeChange = (value: number) => {
//         setSessionData({
//             ...sessionData,
//             startTime: value,
//         });
//     };

//     const handleEndTimeChange = (value: number) => {
//         setSessionData({
//             ...sessionData,
//             endTime: value,
//         });
//     };

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         updateSession(session.id, sessionData)
//     };

//     return (
//         <div>
//             <div className="flex items-center">
//                 <button onClick={() => router.back()}>
//                     <MdKeyboardArrowLeft size={50} />
//                 </button>
//                 <h1 className={"text-2xl font-bold"}>Édition d'une session</h1>
//             </div>
//             <form onSubmit={handleSubmit} className={"text-gray-500"}>
//                 <div className={"mt-5"}>
//                     <h2 className={"font-bold text-lg mb-4"}>
//                         Obligatoire
//                     </h2>
//                     <div className={"flex flex-col sm:flex-row gap-5"}>
//                         <InputIcon
//                             Icon={FaPlusMinus}
//                             placeholder='Nom'
//                             type='string'
//                             name="name"
//                             value={sessionData.name}
//                             onChange={handleInputChange}
//                         />
//                         <Select
//                             value={sessionData.sessionTypeId.toString()}
//                             onValueChange={(value) => handleSelectChange(value, "sessionTypeId")}
//                         >
//                             <SelectTrigger className="w-full flex items-start justify-between ">
//                                 <div className={"flex"}>
//                                     <MdOutlinePlace size={20} className="mr-2" />
//                                     <SelectValue placeholder="Type de session" />
//                                 </div>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {sessionTypes?.map((sessionType) => (
//                                     <SelectItem key={sessionType.id} value={sessionType.id.toString()}>
//                                         {capitalize(sessionType.name)}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div className={"flex flex-col sm:flex-row gap-5 mt-5"}>
//                         <InputIcon
//                             Icon={FaPlusMinus}
//                             placeholder='Capacité'
//                             type='number'
//                             name="maxCapacity"
//                             value={sessionData.maxCapacity}
//                             onChange={handleInputNumberChange}
//                         />
//                         <InputIcon
//                             Icon={LuAlarmCheck}
//                             placeholder={"Délai d'inscription (j)"}
//                             type='number'
//                             name="delayedBeforeRegistration"
//                             value={sessionData.delayedBeforeRegistration}
//                             onChange={handleInputNumberChange}
//                         />
//                     </div>
//                     <div className={"flex flex-col sm:flex-row gap-5 mt-5"}>
//                         <Select
//                             value={sessionData.hallId.toString()}
//                             onValueChange={(value) => handleSelectChange(value, "hallId")}
//                         >
//                             <SelectTrigger className="w-full flex items-start justify-between ">
//                                 <div className={"flex"}>
//                                     <MdOutlinePlace size={20} className="mr-2" />
//                                     <SelectValue placeholder="Salle" />
//                                 </div>
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {halls?.map((hall) => (
//                                     <SelectItem key={hall.id} value={hall.id.toString()}>
//                                         {hall.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                         <DatePicker
//                             value={sessionData.date}
//                             onChange={handleDateChange}
//                         />
//                     </div>
//                 </div>
//                 <div className={"mt-7"}>
//                     <h2 className={"font-bold text-lg mb-2"}>
//                         Optionnel
//                     </h2>
//                     <div className={"flex flex-col sm:flex-row gap-10 mb-7 mt-3"}>
//                         <div className={"flex items-center"}>
//                             <span className={"mt-6 mr-4"}>Début</span>
//                             <DayTimeInput
//                                 value={sessionData.startTime}
//                                 onChange={handleStartTimeChange}
//                             />
//                         </div>
//                         <div className={"flex items-center"}>
//                             <span className={"mt-6 mr-4"}>Fin</span>
//                             <DayTimeInput
//                                 value={sessionData.endTime}
//                                 onChange={handleEndTimeChange}
//                             />
//                         </div>
//                     </div>
//                     <Textarea
//                         placeholder="Note..."
//                         rows={5}
//                         name="note"
//                         value={sessionData.note}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className={"flex flex-col sm:flex-row justify-between mt-5"}>
//                     <Button className={"bg-green-600 my-3"}>Enregister</Button>
//                     <Button className={"bg-red-500 my-3"}>Annuler la session</Button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default SessionEditPage


const SessionEditPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: session, get: getOneSession } = useOneSession(id as string, false);
    const { data: sessionUpdated, updateSession, error: errorUpdate } = useUpdateSession();

    useEffect(() => {
        if (id) {
            getOneSession(`sessions/${id}`);
        }
    }, [id]);

    useEffect(() => {
        if (errorUpdate) {
            toast({
                typeCustom: "danger",
                title: "Erreur d'édition",
                description: errorUpdate,
            })
        }
    }, [errorUpdate])

    useEffect(() => {
        if (sessionUpdated && !sessionUpdated?.error) {
            toast({
                typeCustom: "success",
                title: "Super !",
                description: "Session mise à jour avec succès",
            })
        }
    }, [sessionUpdated])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, sessionData: SessionData) => {
        event.preventDefault();

        updateSession(session.id, sessionData)
    };

    return (
        <div>
            <div className="flex items-center">
                <button onClick={() => router.back()}>
                    <MdKeyboardArrowLeft size={50} />
                </button>
                <h1 className={"text-2xl font-bold"}>Édition d'une session</h1>
            </div>
            <SessionForm session={session} onSubmit={handleSubmit} />
        </div>
    );
};


SessionEditPage.auth = {
    roleId: [Roles.ADMIN],
    unauthorized: "/",
}

export default SessionEditPage;