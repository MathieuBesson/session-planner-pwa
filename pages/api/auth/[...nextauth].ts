import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";



// /**
//  * Takes a token, and returns a new token with updated
//  * `accessToken` and `accessTokenExpires`. If an error occurs,
//  * returns the old token and an error property
//  */
// async function refreshAccessToken(token: JWT) {
//   try {
//     console.log("refresh token " + token.refreshToken)
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         "client_id": process.env.GOOGLE_CLIENT_ID??"".toString(),
//         "client_secret": process.env.GOOGLE_CLIENT_SECRET??"".toString(),
//         "grant_type": "refresh_token",
//         "refresh_token": (token.refreshToken as string),
//       })

//       console.log(url)

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     })

//     const refreshedTokens = await response.json()

//     if (!response.ok) {
//       throw refreshedTokens
//     }

//     return {
//       ...token,
//       googleIdToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     }
//   } catch (error) {
//     console.log(error)

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     }
//   }
// }

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        action: { label: '', type: 'hidden' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
        firstName: { label: 'Prénom', type: 'string' },
        lastName: { label: 'Nom', type: 'string' },
        tokenClub: { label: 'Clé du club', type: 'string' },
      },
      authorize: async (credentials, req) => {

        const { action } = credentials;
        const { email, password } = credentials;
        delete credentials.action;

        let dataToPost = {};
        let ressourcePath = "";
        if (action === "register") {
          dataToPost = credentials;
          ressourcePath = action
        } else {
          dataToPost = { email, password };
          ressourcePath = action
        }
        console.log(req)
        // const action = req.body().get('action');
        // console.log(action)
        const response = await fetch(`http://localhost:8080/users/${ressourcePath}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToPost),
        });

        if (response.ok) {
          const user = await response.json();
          console.log("AUTHOIZEEEE")
          console.log(user)
          return user;
        } else {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async session({ session, token }: { session: Session, token: any }) {
      session.user = token.user;
      session.accessToken = token.user.token.token;

      return session;
    },
    async jwt({ token, user, account }) {
      console.log('JWWWT')
      console.log(token, user)
      if (account && user) {
        return { ...token, user };
      }

      return token;
    },
    async signOut({ token, user }) {
      // Effectuer la déconnexion
      await NextAuth.signout();

      // Rediriger l'utilisateur vers la page de connexion
      window.location.href = '/login';
    },
  },
  pages: {
    signIn: '/login',
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