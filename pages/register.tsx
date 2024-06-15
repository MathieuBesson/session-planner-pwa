import InputIcon from "@/components/block/input-icon";
import Loader from "@/components/block/loader";
import { Button } from "@/components/ui/button";
import { AuthSessionStatus } from "@/enums/auth-session-status";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPlusMinus, FaRegFaceSmile } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiBaseballCapDuotone } from "react-icons/pi";
import { IoKeyOutline } from "react-icons/io5";

const Register: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tokenClub, setTokenClub] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await signIn("credentials", {
            redirect: false,
            email,
            password,
            firstName,
            lastName,
            tokenClub,
            action: "register",
            callbackUrl: `${window.location.origin}`,
        });
    };

    if (status === AuthSessionStatus.AUTHENTICATED) {
        router.push("/");
        return null;
    }

    if (status === AuthSessionStatus.LOADING) {
        return <Loader />;
    }

    if (status === AuthSessionStatus.UNAUTHENTICATED) {
        return (
            <div
                className="min-h-screen w-full bg-cover text-white bg-center flex flex-col items-center justify-center absolute"
                style={{
                    backgroundImage: 'url("/background-image.jpg")',
                    top: 0,
                    left: 0,
                }}
            >
                <div className="
                px-10 flex flex-col justify-center items-center gap-3 mb-5 w-full
                ">
                    <div className="w-60 bg-white h-60 flex items-center justify-center mb-3 rounded-full overflow-hidden">
                        <img src="/USV_LOGO.jpg" className="w-56 translate-y-4" />
                    </div>
                    <h1 className="font-bold text-4xl sm:text-5xl mb-3">USV Badminton</h1>
                    <h2 className="font-semi-bold text-2xl sm:text-3xl mb-8">
                        Session Planner
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full sm:w-96 gap-5">
                        {/* <InputIcon
                            Icon={FaPlusMinus}
                            type="text"
                            placeholder="Prénom"
                            value={firstName}
                            name="firstName"
                            // primary={false}
                            onChange={(event) => setFirstName(event.target.value)}
                        ></InputIcon> */}
                        {/* <label htmlFor="email">Prénom</label>
                        <input
                            className="bg-gray-500 w-full h-12"
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        /> */}
                        {/* <label htmlFor="email">Nom</label>
                        <input
                            className="bg-gray-500 w-full h-12"
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            className="bg-gray-500 w-full h-12"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label htmlFor="password">Clé du club</label>
                        <input
                            className="bg-gray-500 w-full h-12"
                            type="text"
                            id="tokenClub"
                            value={tokenClub}
                            onChange={(event) => setTokenClub(event.target.value)}
                        /> */}

                        <InputIcon
                            Icon={PiBaseballCapDuotone}
                            type="text"
                            placeholder="Prénom"
                            value={firstName}
                            name="firstName"
                            primary={false}
                            onChange={(event) => setFirstName(event.target.value)}
                        ></InputIcon>
                        <InputIcon
                            Icon={FaRegFaceSmile}
                            type="text"
                            placeholder="Nom"
                            value={lastName}
                            name="lastName"
                            primary={false}
                            onChange={(event) => setLastName(event.target.value)}
                        ></InputIcon>
                        <InputIcon
                            Icon={MdOutlineEmail}
                            type="text"
                            placeholder="Email"
                            value={email}
                            name="email"
                            primary={false}
                            onChange={(event) => setEmail(event.target.value)}
                        ></InputIcon>
                        <InputIcon
                            Icon={IoKeyOutline}
                            type="text"
                            placeholder="Token club"
                            value={tokenClub}
                            name="tokenClub"
                            primary={false}
                            onChange={(event) => setTokenClub(event.target.value)}
                        ></InputIcon>
                        <InputIcon
                            Icon={RiLockPasswordLine}
                            type="password"
                            placeholder="Password"
                            value={password}
                            name="password"
                            primary={false}
                            onChange={(event) => setPassword(event.target.value)}
                        ></InputIcon>
                        <Button onClick={handleSubmit} className={`w-full sm:w-96 bg-blue-500 my-3 text-md`}>
                            S'inscrire
                        </Button>
                    </form>
                    <Link href={"/login"} className="underline underline-offset-4">Se connecter</Link>
                </div>
            </div>
        );
    }
};

Register.auth = {
    isProtected: false,
};

export default Register;
