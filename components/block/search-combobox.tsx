// import { useEffect, useState } from "react"
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
// import { Button } from "../ui/button"
// import { ChevronsUpDown } from "lucide-react"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
// import { IoIosAdd } from "react-icons/io";

// // Typage des données de l'API
// type NameOption = {
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

// export function SearchCombobox() {
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

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { IoIosAdd } from "react-icons/io";
import { useSearchUser } from "../hooks/api-request"
import { Avatar, AvatarFallback } from "../ui/avatar"

type User = {
  id: number,
  externalId: string,
  firstName: string,
  lastName: string,
  email: string,
  roleId: number,
  picture: string | null,
  createdAt: string,
  updatedAt: string,
  statusLine: number
}

type NameOption = {
  label: string
  value: string
  image: string
  initials: string
  id: number
}

const mapUserToNameOption = (user: User): NameOption => {
  return {
    image: user.picture ?? "",
    label: `${user.firstName} ${user.lastName}`,
    initials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
    value: `${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`,
    id: user.id,
  }
}

export function SearchCombobox({ setUserIdSelectedComboBox }: { setUserIdSelectedComboBox: any }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [query, setQuery] = useState("")
  const { data, isLoading, error, searchUser } = useSearchUser();
  const [options, setOptions] = useState<NameOption[]>([]);
  const [userIdSelected, setUserIdSelected] = useState(null);

  useEffect(() => {
    console.log(query)
    if (query) {
      searchUser(query);
    } else {
      setOptions([])
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      const nameOptions = data.map(mapUserToNameOption);
      setOptions(nameOptions);
    }
  }, [data, mapUserToNameOption]);

  const handleAddUser = () => {
    console.log(userIdSelected)
    if(userIdSelected){
      setUserIdSelectedComboBox(userIdSelected)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={"flex"}>
        <PopoverTrigger asChild className={"mr-2"}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[175px] justify-end"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : "Inscrire un joueur"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <Button className={"bg-blue-500 px-2 py-2"} onClick={handleAddUser}>
          <IoIosAdd size={30} />
        </Button>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Rechercher..."
            value={query}
            onChangeCapture={(e: any) => setQuery(e.target.value)}
          />
          {isLoading && <div>Chargement...</div>}
          {error && <div>Erreur</div>}
          <CommandEmpty>Aucun joueur...</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  setUserIdSelected(option.id)
                  console.log(`Selected name: ${currentValue}`)
                }}
              >
                <Avatar className="mr-3 border-2 border-gray-300">
                  <AvatarFallback>{option.initials}</AvatarFallback>
                </Avatar>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
