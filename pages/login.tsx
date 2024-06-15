import InputIcon from "@/components/block/input-icon";
import Loader from "@/components/block/loader";
import { Button } from "@/components/ui/button";
import { AuthSessionStatus } from "@/enums/auth-session-status";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("mathieu.besson@session-planner.fr");
  const [password, setPassword] = useState("motdepasse");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signIn("credentials", {
      redirect: false,
      email,
      password,
      action: "login",
      callbackUrl: `${window.location.origin}`,
    });
  };

  useEffect(() => {
    console.log(session, status);
  }, [session, status]);

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
        <div className="px-10 mb-20 flex flex-col items-center justify-center w-full">
          <div className="w-60 bg-white h-60 flex items-center justify-center mb-3 rounded-full overflow-hidden">
            <img src="/USV_LOGO.jpg" className="w-56 translate-y-4" />
          </div>
          <h1 className="font-bold text-4xl sm:text-5xl mb-3">USV Badminton</h1>
          <h2 className="font-semi-bold text-2xl sm:text-3xl mb-8">
            Session Planner
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full sm:w-96">
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
              Icon={RiLockPasswordLine}
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              primary={false}
              onChange={(event) => setPassword(event.target.value)}
            ></InputIcon>
            <Button onClick={handleSubmit} className={`w-full sm:w-96 bg-blue-500 my-3 text-md`}>
              Se connecter
            </Button>
          </form>
          <Link href={"/register"} className="underline underline-offset-4">S'inscrire</Link>
        </div>
      </div>
    );
  }
};

Login.auth = {
  isProtected: false,
};

export default Login;
