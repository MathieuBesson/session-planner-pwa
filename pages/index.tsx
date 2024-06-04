// "use client"

import Loader from "@/components/block/loader";
import SessionPreview from "@/components/block/session-preview";
import { useHalls, useSessionTypes, useSessions } from "@/components/hooks/api-request";
import { LoaderCircle, LoaderIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { LuPlusCircle } from "react-icons/lu";

// import { Badge } from '@/components/ui/badge';
// import {
//   CardTitle,
//   Card,
//   CardContent,
//   CardHeader,
// } from '@/components/ui/card';
// import { IconType } from 'react-icons';
// import { HiOutlineClock, HiOutlineTag } from 'react-icons/hi';
// import { MdOutlineCalendarMonth, MdOutlinePlace } from 'react-icons/md';
// import { Switch } from "@/components/ui/switch"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { useState } from "react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { useEffect } from "react"
// import { IoIosAdd } from "react-icons/io";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { LuAlarmCheck } from "react-icons/lu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Input } from '@/components/ui/input';
// import { format } from "date-fns"
// import { Calendar } from "@/components/ui/calendar"
// import { fr } from "date-fns/locale"
// import { Textarea } from '@/components/ui/textarea';
// import { FaPlusMinus } from "react-icons/fa6";

// const UserPreview = () => {
//   return (
//     <div className={"flex sm:w-1/2 items-center my-2"}>
//       <img
//         className={"h-10 w-10 object-cover rounded-full mr-2"}
//         src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
//       />
//       <span className={"text-sm font-bold"}>
//         Louann HERVEOU
//       </span>
//       {/* <RiDeleteBinLine color='#EF4444' size={23} className={"ml-3"}/> */}
//       {/* <div className={"ml-5"}>
//         <Select>
//           <SelectTrigger className="w-[100px]">
//             <SelectValue placeholder="Rôle" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="light">Joueur</SelectItem>
//             <SelectItem value="dark">Admin</SelectItem>
//           </SelectContent>
//         </Select>
//       </div> */}
//     </div>
//   )
// }

// const SessionPage = () => {
//   return (
//     <div className={"w-full max-w-md"}>

//       <h1 className={"text-2xl font-bold mb-5"}>Jeu libre</h1>
//       <div>
//         <div className={"flex flex-col sm:flex-row"}>
//           <BadgeWithIcon Icon={HiOutlineTag} color={"bg-blue-500"}>
//             Session libre
//           </BadgeWithIcon>
//           <BadgeWithIcon Icon={HiOutlineTag} color={"bg-red-500"} suffix={"20/20"}>
//             Complet
//           </BadgeWithIcon>
//         </div>
//         <Card className={"w-full max-w-md flex flex-col sm:flex-row px-4 py-2 mb-4"}>
//           <IndicationWithIcon Icon={MdOutlineCalendarMonth}>
//             Jeudi 16 Mai, 20h-22h
//           </IndicationWithIcon>
//           <IndicationWithIcon Icon={MdOutlinePlace}>
//             Salle de la Chalotais
//           </IndicationWithIcon>
//         </Card>
//         <Card className={"w-full max-w-md px-4 py-2 text-gray-500 mb-4 "}>
//           Florent Chatelain ouvre la salle
//         </Card>
//         <div className={"flex justify-start sm:justify-center mb-10"}>
//           <SwitchRegister></SwitchRegister>
//         </div>
//         <Card className={"flex flex-col justify-center items-center w-full max-w-md px-4 py-6 mb-4 "}>
//           <h2 className={"font-bold text-xl mb-4"}>Liste des inscrits</h2>
//           <ComboboxDemo></ComboboxDemo>
//           <div className={"flex flex-wrap flex-col sm:flex-row justify-center items-center sm:justify-start w-full max-w-md text-gray-500 mb-4 mt-5"}>
//             <UserPreview></UserPreview>
//             <UserPreview></UserPreview>
//             <UserPreview></UserPreview>
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }

// // Typage des données de l'API
// interface NameOption {
//   label: string
//   value: string
//   image: string
// }

// const fetchRandomNames = async (query: string): Promise<NameOption[]> => {
//   const response = await fetch(`https://randomuser.me/api/?results=10&name=${query}`)
//   const data = await response.json()
//   return data.results.map((user: any) => ({
//     image: user.picture.large,
//     label: `${user.name.first} ${user.name.last}`,
//     value: `${user.name.first.toLowerCase()}_${user.name.last.toLowerCase()}`,
//   }))
// }

// export function ComboboxDemo() {
//   const [open, setOpen] = useState(false)
//   const [value, setValue] = useState("")
//   const [options, setOptions] = useState<NameOption[]>([])
//   const [query, setQuery] = useState("")

//   useEffect(() => {
//     console.log(query)
//     if (query) {
//       const loadOptions = async () => {
//         const names = await fetchRandomNames(query)
//         setOptions(names)
//       }
//       loadOptions()
//     }
//   }, [query])

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <div className={"flex"}>
//         <PopoverTrigger asChild className={"mr-2"}>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-[175px] justify-between"
//           >
//             {value
//               ? options.find((option) => option.value === value)?.label
//               : "Inscrire un joueur"}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <Button className={"bg-blue-500 px-2 py-2"}>
//           <IoIosAdd size={30} />
//         </Button>
//       </div>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput
//             placeholder="Rechercher..."
//             value={query}
//             onChangeCapture={(e: any) => setQuery(e.target.value)}
//           />
//           <CommandEmpty>Aucune donnée...</CommandEmpty>
//           <CommandGroup>
//             {options.map((option) => (
//               <CommandItem
//                 key={option.value}
//                 value={option.value}
//                 onSelect={(currentValue) => {
//                   setValue(currentValue === value ? "" : currentValue)
//                   setOpen(false)
//                   console.log(`Selected name: ${currentValue}`)
//                 }}
//               >
//                 <img
//                   className={"h-10 w-10 object-cover rounded-full mr-2"}
//                   src={option.image} />
//                 {option.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }

// import { getSession, signIn } from 'next-auth/react'
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import 'moment/locale/fr';
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const SessionList: React.FC = () => {
    const router = useRouter()


    // Utilisez le hook useSessions
    const { data: sessions, isLoading: isLoadingSession, isError: isErrorSession } = useSessions();
    const { data: halls, isLoading: isLoadingHalls, isError: isErrorHalls } = useHalls();
    const { data: sessionTypes, isLoading: isLoadingSessionTypes, isError: isErrorSessionTypes } = useSessionTypes();
    

    if (isLoadingSession && isLoadingHalls && isLoadingSessionTypes) {
        return <Loader />;
    }

    if (isErrorSession || isErrorHalls || isErrorSessionTypes) {
        return router.push('error');
    }

    const getHallById = (hallId: number) => {
        return halls.find((hall: any) => hall.id === hallId)
    }

    const getSessionTypeById = (sessionTypeId: number) => {
        return sessionTypes.find((sessionType: any) => sessionType.id === sessionTypeId)
    }

    return (
        <>
            <div className="flex justify-end gap-3 mb-5">
                <button onClick={() => router.push('/session/create')}>
                    <LuPlusCircle size={30} />
                </button>
                <button onClick={() => router.push('/users')}>
                    <MdOutlinePeopleAlt size={30} />
                </button>
                <button onClick={() => signOut()}>
                    <TbLogout size={30} />
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-2">Sessions à venir</h1>
            <h2 className="text-md text-gray-500 mb-5">Inscription possible une semaine avant la session.</h2>
            {sessions && halls && sessionTypes && sessions.map((session: any) =>

                <SessionPreview
                    key={session.id}
                    id={session.id}
                    name={session.name}
                    date={session.date}
                    salle={getHallById(session.hallId).name}
                    startTime={session.startTime}
                    endTime={session.endTime}
                    sessionType={getSessionTypeById(session.sessionTypeId).name}
                    note={session.note}
                    users={session.users}
                    maxCapacity={session.maxCapacity}
                    delayBeforeRegistration={session.delayBeforeRegistration}
                    cancelled={session.cancelled}
                />
            )}
        </>
    );
}

export default SessionList


// const InputIcon = ({ Icon, type, placeholder }: { Icon: IconType, type: string, placeholder: string }) => {
//   return (
//     <div className="relative w-full text-gray-500">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//         <Icon size={18} />
//       </span>
//       <Input
//         type={type}
//         placeholder={placeholder}
//         className="pl-10"
//       />
//     </div>
//   )
// }

// export function DatePickerDemo() {
//   const [date, setDate] = useState<Date>()

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-full justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <MdOutlineCalendarMonth size={20} className="mr-2" />
//           {date ? format(date, "PPP", { locale: fr }) : <span>Date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//           locale={fr}
//         />
//       </PopoverContent>
//     </Popover>
//   )
// }

// const DayTimeInput = () => {
//   return (
//     <div className={"flex gap-4"}>
//       <div className={"flex flex-col justify-center items-center gap-2"}>
//         <span className={"text-sm"}>Heures</span>
//         <Input
//           type='number'
//           placeholder='00'
//           className="placeholder:text-center w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
//       </div>
//       <div className={"flex flex-col justify-center items-center gap-2"}>
//         <span className={"text-sm"}>Minutes</span>
//         <Input
//           type='number'
//           placeholder='00'
//           className="placeholder:text-center w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
//       </div>
//     </div>
//   )
// }


// const CreateSessionPage = () => {
//   return (
//     <div>
//       <h1 className={"text-2xl font-bold mb-5"}>Création d'une session</h1>
//       <form className={"text-gray-500"}>
//         <div className={"mt-5"}>
//           <h2 className={"font-bold text-lg mb-4"}>
//             Obligatoire
//           </h2>
//           <div className={"flex flex-col sm:flex-row gap-5"}>
//             <InputIcon Icon={FaPlusMinus} placeholder='Capacité' type='number'></InputIcon>
//             <InputIcon Icon={LuAlarmCheck} placeholder={"Délai d'inscription (j)"} type='number'></InputIcon>
//           </div>
//           <div className={"flex flex-col sm:flex-row gap-5 mt-5"}>
//             <Select>
//               <SelectTrigger className="w-full flex items-start justify-between ">
//                 <div className={"flex"}>
//                   <MdOutlinePlace size={20} className="mr-2" />
//                   <SelectValue placeholder="Salle" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="joueur">Joueur</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//               </SelectContent>
//             </Select>
//             <DatePickerDemo></DatePickerDemo>
//           </div>
//         </div>
//         <div className={"mt-7"}>
//           <h2 className={"font-bold text-lg mb-2"}>
//             Optionnel
//           </h2>
//           <div className={"flex flex-col sm:flex-row gap-10 mb-7 mt-3"}>
//             <div className={"flex items-center"}>
//               <span className={"mt-6 mr-4"}>Début</span>
//               <DayTimeInput />
//             </div>
//             <div className={"flex items-center"}>
//               <span className={"mt-6 mr-4"}>Fin</span>
//               <DayTimeInput />
//             </div>
//           </div>
//           <Textarea placeholder="Note..." rows={5} />
//         </div>
//         <div className={"flex flex-col sm:flex-row justify-between mt-5"}>
//           <Button className={"bg-green-600 my-3"}>Enregister</Button>
//           <Button className={"bg-red-500 my-3"}>Annuler la session</Button>
//         </div>
//       </form>
//     </div>
//   );
// }
