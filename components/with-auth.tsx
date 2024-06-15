import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const withAuth = (WrappedComponent: React.FC, requiredRole: number) => {
    return function AuthComponent(props: any) {
        // const { data, status } = useSession()
        // const [user, setUser] = useState<any>(null)
        // const router = useRouter()


        // useEffect(() => {
        //     const verifyToken = async () => {
        //         console.log(JSON.stringify("ok"))
        //         console.log(data?.auth)
        //         console.log(status)
        //             if (status === 'authenticated' && data?.auth?.access_token) {
        //                 try {
        //                     const res = await fetch('http://localhost:8080/auth/check-token', {
        //                         method: 'POST',
        //                         headers: {
        //                             'Authorization': `Bearer ${data?.auth.access_token}`,
        //                         },
        //                         body: JSON.stringify({idToken: data?.auth.id_token})
        //                     })
        //                     if (res.ok) {
        //                         const data = await res.json()
        //                         console.log(data)
        //                         setUser(data.user)
        //                     } else {
        //                         // router.push('/auth/error')
        //                     }
        //                 } catch (error) {
        //                     console.error('Error verifying token:', error)
        //                     // router.push('/auth/error')
        //                 }
        //             } else if (status === 'unauthenticated') {
        //                 router.push('/login')
        //             }
        //     }

        //     verifyToken()
        // }, [, status])

        // if (status === 'loading' || !user) {
        //     return <div>Loading...</div>
        // }

        // if (user.roleId !== requiredRole) {
        //     return <div>Access Denied</div>
        // }

        return <WrappedComponent {...props} />
    }
}

export default withAuth
