import GoogleSignInButton from '@/components/ui/google-signin-button'
import { AuthSessionStatus } from '@/enums/auth-session-status'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(status)
    if (status === AuthSessionStatus.AUTHENTICATED) {
      router.push('/')
    }
  }, [status, router])

  if (status === AuthSessionStatus.LOADING) {
    return null
  }

  if (status === AuthSessionStatus.UNAUTHENTICATED) {
    return (
      <div className="min-h-screen w-full bg-cover bg-center text-white flex flex-col items-center justify-center absolute" style={{ backgroundImage: 'url("/background-image.jpg")', top: 0, left: 0 }}>
        <div className='mb-20 flex flex-col items-center justify-center'>
          <h1 className='font-bold text-4xl sm:text-5xl mb-3'>USV Badminton</h1>
          <h2 className='font-semi-bold text-2xl sm:text-3xl mb-8'>Session Planner</h2>
          <GoogleSignInButton />
        </div>
      </div>
    )
  }

}