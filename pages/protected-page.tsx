// "use client"

// // pages/protected.tsx
// import { GetServerSideProps } from 'next'
// import { getSession } from 'next-auth/react'

// interface Data {
//   // Remplacez par les champs réels de votre réponse API
//   id: number
//   name: string
//   email: string
// }

// interface ProtectedPageProps {
//   data: Data
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const session : any = await getSession(context)

//   const token = session?.googleIdToken
//   console.log(session)
//   console.log("oooooooook")
// //   return ;

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   const res = await fetch('http://localhost:8080/halls', {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//   console.log(res)


//   if (!res.ok) {
//     return {
//       notFound: true,
//     }
//   }

//   const data: Data = await res.json()
//   console.log(data)

//   return {
//     props: {
//       data
//     }
//   }
// }

// const ProtectedPage: React.FC<ProtectedPageProps> = ({ data }) => {
//   return (
//     <div>
//       <h1>Protected Page</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   )
// }

// export default ProtectedPage


"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface Data {
  // Remplacez par les champs réels de votre réponse API
  id: number
  name: string
  email: string
}

import { signOut } from 'next-auth/react'
import withAuth from '@/components/with-auth'

const ProtectedPage: React.FC = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default ProtectedPage

// const ProtectedPage: React.FC = () => {
//   const { data: session, status } = useSession()
//   const [data, setData] = useState<Data | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     if (status === 'loading') return // Do nothing while loading
//     if (status === 'unauthenticated') {
//       router.push('/login') // Redirect to login if not authenticated
//     }

//     const fetchData = async () => {
//       if (session?.googleIdToken) {
//         try {
//           const res = await fetch('http://localhost:8080/halls', {
//             headers: {
//               'Authorization': `Bearer ${session.googleIdToken}`
//             }
//           })

//           if (!res.ok) {
//             throw new Error('Failed to fetch data')
//           }

//           const data: Data = await res.json()
//           setData(data)
//         } catch (error) {
//           console.error('Error fetching data:', error)
//           // Handle errors accordingly, e.g., show a message to the user
//         }
//       }
//     }

//     fetchData()
//   }, [session, status, router])

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <h1>Protected Page</h1>
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <div>Loading data...</div>
//       )}
//     </div>
//   )
// }

// export default ProtectedPage
