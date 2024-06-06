// pages/_app.tsx
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../app/globals.css';
import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import Loader from '@/components/block/loader';
import { useRouter } from 'next/router';
import { Roles } from '@/enums/roles';
import { AuthSessionStatus } from '@/enums/auth-session-status';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Session Planner - USV Badminton</title>
      </Head>

      <main className="flex min-h-screen flex-col p-8 md:w-1/2 md:m-auto">
        <Auth
          componentAuthConf={Component.auth ?? null}
        >
          <Component {...pageProps} />
        </Auth>
      </main>

      <Toaster />
    </SessionProvider>
  )
}

function Auth({ children, componentAuthConf }: any) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isUser = !!session?.user
  const [isDisplay, setIsDisplay] = useState(false);

  let baseComponentAuthConf = {
    roleId: [Roles.MEMBER, Roles.ADMIN],
    unauthorized: "/login",
  }

  if (componentAuthConf !== null) {
    baseComponentAuthConf = {
      ...baseComponentAuthConf,
      ...componentAuthConf
    }
  }

  console.log(children.type.name, isDisplay)

  useEffect(() => {

    console.log(componentAuthConf, baseComponentAuthConf, session, status)
    if (
      status !== AuthSessionStatus.LOADING &&
      (
        baseComponentAuthConf.isProtected === false ||
        baseComponentAuthConf.roleId && baseComponentAuthConf.roleId.includes(session?.user?.roleId
        )
      )
    ) {
      setIsDisplay(true)
      return;
    }

    setIsDisplay(false)
    router.push(baseComponentAuthConf.unauthorized)

  }, [isUser, status, children.type.name])

  if (isDisplay) {
    return children
  }

  return <Loader />
}

export default MyApp
