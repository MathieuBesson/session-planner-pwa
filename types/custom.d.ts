// types/custom.d.ts

import 'next-auth'

declare module 'next-auth' {
  interface Session {
    idToken: string;
    accessToken: string;
  }
}
