export default function Loader() {
    return (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 flex flex-col justify-center items-center ">
            <p className="text-center mb-10 font-semi-bold text-md">En cours de chargement...</p>
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-black border-4 h-16 w-16"></div>
        </div>
    )
}