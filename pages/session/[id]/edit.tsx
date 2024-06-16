import SessionForm, { SessionData } from "@/components/block/session-form";
import { useOneSession, useUpdateSession } from "@/components/hooks/api-request";
import { toast } from "@/components/ui/use-toast";
import { Roles } from "@/enums/roles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

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