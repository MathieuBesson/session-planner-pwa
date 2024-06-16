import DatePicker from "@/components/block/date-picker";
import DayTimeInput from "@/components/block/day-time-input";
import InputIcon from "@/components/block/input-icon";
import { useDeleteSession, useHalls, useOneSession, useSessionTypes, useUpdateSession } from "@/components/hooks/api-request";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import withAuth from "@/components/with-auth";
import { capitalize, convertSecondsToHoursMinutes } from "@/lib/utils";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { LuAlarmCheck } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdOutlinePlace } from "react-icons/md";
import { useToast } from "../ui/use-toast";

export interface SessionData {
    sessionTypeId: number | string;
    hallId: number | string;
    startTime: number | string;
    endTime: number | string;
    maxCapacity: number | string;
    name: string;
    note: string;
    date: string;
    delayedBeforeRegistration: number | string;
}

interface SessionFormProps {
    session?: SessionData | null;
    onSubmit: (session: SessionData) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSubmit }) => {
    const router = useRouter();
    const { data: halls } = useHalls();
    const { data: sessionTypes } = useSessionTypes();
    const { data: updatedSession, updateSession, error: errorUpdateSession } = useUpdateSession();
    const { data: deletedSession, deleteSession, error: errorDeleteSession } = useDeleteSession();
    const { toast } = useToast()

    const [sessionData, setSessionData] = useState<SessionData>({
        sessionTypeId: "",
        hallId: "",
        startTime: "",
        endTime: "",
        maxCapacity: "",
        name: "",
        note: "",
        date: "",
        delayedBeforeRegistration: "",
    });

    useEffect(() => {
        if (session) {
            setSessionData({
                sessionTypeId: session.sessionTypeId,
                hallId: session.hallId,
                startTime: session.startTime,
                endTime: session.endTime,
                maxCapacity: session.maxCapacity,
                name: session.name,
                note: session.note || "",
                date: session.date.split("T")[0],
                delayedBeforeRegistration: session.delayBeforeRegistration,
            });
        }
    }, [session]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setSessionData({
            ...sessionData,
            [name]: value,
        });
    };

    const handleInputNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = parseInt(event.target.value);
        const name = event.target.name;
        setSessionData({
            ...sessionData,
            [name]: value,
        });
    };

    const handleSelectChange = (value: string, key: string) => {
        setSessionData({
            ...sessionData,
            [key]: Number(value),
        });
    };

    const handleDateChange = (date: Date) => {
        const dateAtNoon = new Date(date);
        dateAtNoon.setHours(12, 0, 0, 0);
        setSessionData({
            ...sessionData,
            date: dateAtNoon.toISOString().split("T")[0],
        });
    };

    const handleStartTimeChange = (value: number) => {
        setSessionData({
            ...sessionData,
            startTime: value,
        });
    };

    const handleEndTimeChange = (value: number) => {
        setSessionData({
            ...sessionData,
            endTime: value,
        });
    };

    const handleCancelSession = () => {
        updateSession(session?.id, { ...session, cancelled: !session?.cancelled })
    }

    const handleDeleteSession = (e) => {
        e.preventDefault();
        deleteSession(session?.id)
    }

    useEffect(() => {
        if (errorUpdateSession) {
            toast({
                typeCustom: "danger",
                title: "Erreur d'édition",
                description: errorUpdateSession,
            })
        }
    }, [errorUpdateSession])

    useEffect(() => {
        if (updatedSession && !updatedSession?.error) {
            toast({
                typeCustom: "success",
                title: "Super !",
                description: "Session mise à jour avec succès",
            })
            router.push(`/session/${session.id}`)
        }
    }, [updatedSession])


    useEffect(() => {
        if (errorDeleteSession) {
            toast({
                typeCustom: "danger",
                title: "Erreur de suppression",
                description: errorDeleteSession,
            })
        }
    }, [errorDeleteSession])

    useEffect(() => {
        console.log(deletedSession)
        if (deletedSession !== null && !deletedSession?.error) {
            toast({
                typeCustom: "success",
                title: "Super !",
                description: "Session supprimé avec succès",
            })
            router.push(`/`)
        }
    }, [deletedSession])

    return (
        <form onSubmit={(e) => onSubmit(e, sessionData)} className={"text-gray-500"}>
            <div className={"mt-5"}>
                <h2 className={"font-bold text-lg mb-4"}>
                    Obligatoire
                </h2>
                <div className={"flex flex-col sm:flex-row gap-5"}>
                    <InputIcon
                        Icon={FaPlusMinus}
                        placeholder='Nom'
                        type='string'
                        name="name"
                        value={sessionData.name}
                        onChange={handleInputChange}
                    />
                    <Select
                        value={sessionData.sessionTypeId.toString()}
                        onValueChange={(value) => handleSelectChange(value, "sessionTypeId")}
                    >
                        <SelectTrigger className="w-full flex items-start justify-between ">
                            <div className={"flex"}>
                                <MdOutlinePlace size={20} className="mr-2" />
                                <SelectValue placeholder="Type de session" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {sessionTypes?.map((sessionType) => (
                                <SelectItem key={sessionType.id} value={sessionType.id.toString()}>
                                    {capitalize(sessionType.name)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={"flex flex-col sm:flex-row gap-5 mt-5"}>
                    <InputIcon
                        Icon={FaPlusMinus}
                        placeholder='Capacité'
                        type='number'
                        name="maxCapacity"
                        value={sessionData.maxCapacity}
                        onChange={handleInputNumberChange}
                    />
                    <InputIcon
                        Icon={LuAlarmCheck}
                        placeholder={"Délai d'inscription (j)"}
                        type='number'
                        name="delayedBeforeRegistration"
                        value={sessionData.delayedBeforeRegistration}
                        onChange={handleInputNumberChange}
                    />
                </div>
                <div className={"flex flex-col sm:flex-row gap-5 mt-5"}>
                    <Select
                        value={sessionData.hallId.toString()}
                        onValueChange={(value) => handleSelectChange(value, "hallId")}
                    >
                        <SelectTrigger className="w-full flex items-start justify-between ">
                            <div className={"flex"}>
                                <MdOutlinePlace size={20} className="mr-2" />
                                <SelectValue placeholder="Salle" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {halls?.map((hall) => (
                                <SelectItem key={hall.id} value={hall.id.toString()}>
                                    {hall.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DatePicker
                        value={sessionData.date}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            <div className={"mt-7"}>
                <h2 className={"font-bold text-lg mb-2"}>
                    Optionnel
                </h2>
                <div className={"flex flex-col sm:flex-row gap-10 mb-7 mt-3"}>
                    <div className={"flex items-center"}>
                        <span className={"mt-6 mr-4"}>Début</span>
                        <DayTimeInput
                            value={sessionData.startTime}
                            onChange={handleStartTimeChange}
                        />
                    </div>
                    <div className={"flex items-center"}>
                        <span className={"mt-6 mr-4"}>Fin</span>
                        <DayTimeInput
                            value={sessionData.endTime}
                            onChange={handleEndTimeChange}
                        />
                    </div>
                </div>
                <Textarea
                    placeholder="Note..."
                    rows={5}
                    name="note"
                    value={sessionData.note}
                    onChange={handleInputChange}
                />
            </div>
            <div className={"flex flex-col sm:flex-row justify-between mt-5"}>
                <Button type="submit" className={"bg-green-600 my-3"}>
                    {session ? "Enregistrer" : "Créer la session"}
                </Button>
                {session &&
                    <>
                        <Button onClick={() => handleCancelSession()} className={`bg-${session.cancelled === true ? 'blue' : "red"}-500 my-3`}>

                            {session.cancelled === true
                                ? "Réactiver"
                                : "Annuler"
                            } la session

                        </Button>
                        <Button onClick={(e) => handleDeleteSession(e)} className={"bg-white text-red-500 border-red-500 border-2 my-3 hover:text-white hover:bg-red-500"}>
                            Supprimer la session
                        </Button>
                    </>
                }
            </div>
        </form>
    );
}

export default SessionForm
