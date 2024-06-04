import { signIn } from 'next-auth/react'

const GoogleSignInButton = () => {
    return (
        <button onClick={() => signIn('google')} className="px-4 py-3 border-2 flex gap-2 border-slate-200 text-blue-500 hover:text-white bg-white hover:bg-transparent font-bold hover:shadow transition duration-150 rounded-lg text-xl">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Connexion avec Google</span>
        </button>
    )
}

export default GoogleSignInButton
