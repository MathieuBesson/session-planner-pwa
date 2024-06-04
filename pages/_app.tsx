// pages/_app.tsx
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../app/globals.css';
import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Session Planner - USV Badminton</title>
      </Head>
      <main className="flex min-h-screen flex-col p-8 md:w-1/2 md:m-auto">
        <Component {...pageProps} />
      </main>
      <Toaster />
    </SessionProvider>
  )
}

export default MyApp
