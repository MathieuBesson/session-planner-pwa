import Loader from "@/components/block/loader";
import { AuthSessionStatus } from "@/enums/auth-session-status";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("mathieu.besson@session-planner.fr");
  const [password, setPassword] = useState("totototo");

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
        <div className="mb-20 flex flex-col items-center justify-center w-full">
          <h1 className="font-bold text-4xl sm:text-5xl mb-3">USV Badminton</h1>
          <h2 className="font-semi-bold text-2xl sm:text-3xl mb-8">
            Session Planner
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-8/12">
            <label htmlFor="email">Email</label>
            <input
              className="bg-gray-500 w-full h-12"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              className="bg-gray-500 w-full h-12"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={(e) => router.push('/register')}>S'identifier</button>
        </div>
      </div>
    );
  }
};

Login.auth = {
  isProtected: false,
};

export default Login;
