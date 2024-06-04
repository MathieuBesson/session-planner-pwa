import SessionForm, { SessionData } from "@/components/block/session-form";
import { useCreateSession } from "@/components/hooks/api-request";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const SessionCreatePage: React.FC = () => {
    const router = useRouter();

    const { data: sessionCreated, createSession } = useCreateSession();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, sessionData: SessionData) => {
        event.preventDefault();

        createSession(sessionData);
    };

    useEffect(() => {
        if (sessionCreated) {
            router.push(`/session/${sessionCreated.id}`)
        }

    }, [sessionCreated])

    return (
        <div>
            <div className="flex items-center">
                <button onClick={() => router.back()}>
                    <MdKeyboardArrowLeft size={50} />
                </button>
                <h1 className={"text-2xl font-bold"}>Création d'une session</h1>
            </div>
            <SessionForm onSubmit={handleSubmit} />
        </div>
    );
};

export default SessionCreatePage;
