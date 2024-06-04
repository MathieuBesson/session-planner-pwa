import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'



/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    console.log("refresh token " + token.refreshToken)
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        "client_id": process.env.GOOGLE_CLIENT_ID??"".toString(),
        "client_secret": process.env.GOOGLE_CLIENT_SECRET??"".toString(),
        "grant_type": "refresh_token",
        "refresh_token": (token.refreshToken as string),
      })

      console.log(url)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      googleIdToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log('JWT Callback', { token, account })
      // console.log('JWT Callback')
      if (account) {
        token.googleIdToken = account.id_token
        token.refreshToken = account.refresh_token


        // Faire une requête API pour créer un utilisateur si nécessaire ou récupérer l'utilisateur
        const response = await fetch('http://localhost:8080/auth/authenticate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${account.id_token}`,
            'Content-Type': 'application/json'
          }
        })

        const userData = await response.json()

        // Ajouter les données de l'utilisateur dans le token
        token.user = userData.user
      }

      if (account?.expires_at && Date.now() < account?.expires_at) {
        // return token
      }

      return token


      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }: { session: any, token: JWT }) {
      // console.log('Session Callback', { session, token }) 
      console.log('Session Callback')
      session.googleIdToken = token.googleIdToken

      // Ajouter les données de l'utilisateur dans la session
      session.auth = token

      return session
    },
  },
})


// import nextAuth from "next-auth"
// import NextAuth, { type User } from "next-auth"
// import Google from "next-auth/providers/google"

// export default NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       // Google requires "offline" access_type to provide a `refresh_token`
//       // authorization: { params: { access_type: "offline", prompt: "consent" } },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//       console.log("JWTTTTTT", { token, account })
//       if (account) {

//         return token
//         // return {
//         //   access_token: account.access_token,
//         //   expires_at: account.expires_at,
//         //   refresh_token: account.refresh_token,
//         //   id_token: account.id_token,
//         //   user: {
//         //     name: account?.name,
//         //     email: account?.email,
//         //     image: token?.picture
//         //   },
//         // }
//         } else if (Date.now() < (token.expires_at) * 1000) {
//           // Subsequent logins, if the `access_token` is still valid, return the JWT
//           return token
//       } else {
//         // Subsequent logins, if the `access_token` has expired, try to refresh it
//         if (!token.refresh_token) throw new Error("Missing refresh token")
//         console.log("la")

//         try {
//           // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
//           // at their `/.well-known/openid-configuration` endpoint.
//           // i.e. https://accounts.google.com/.well-known/openid-configuration
//           const response = await fetch("https://oauth2.googleapis.com/token", {
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: new URLSearchParams({
//               client_id: process.env.GOOGLE_CLIENT_ID!,
//               client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//               grant_type: "refresh_token",
//               refresh_token: token.refresh_token!,
//             }),
//             method: "POST",
//           })

//           const responseTokens = await response.json()

//           if (!response.ok) throw responseTokens

//           return {
//             // Keep the previous token properties
//             ...token,
//             access_token: responseTokens.access_token,
//             expires_at: Math.floor(Date.now() / 1000 + (responseTokens.expires_in as number)),
//             // Fall back to old refresh token, but note that
//             // many providers may only allow using a refresh token once.
//             refresh_token: responseTokens.refresh_token ?? token.refresh_token,
//           }
//         } catch (error) {
//           console.error("Error refreshing access token", error)
//           // The error property can be used client-side to handle the refresh token error
//           return { ...token, error: "RefreshAccessTokenError" as const }
//         }
//       }
//     },
//     async session({ session, token }) {
//       console.log("SESSSSSSIOOOOOON")
//       console.log(session, token)
//       if (token.user) {
//         session.user = token.user as User
//       }

//       session.auth = token;
//       // session.accessToken = token.accessToken as string

//       return session
//     },
//   },
// })

// declare module "next-auth" {
//   interface Session {
//     error?: "RefreshAccessTokenError"
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string
//     expires_at: number
//     refresh_token: string
//     error?: "RefreshAccessTokenError"
//   }
// }