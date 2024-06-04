import { RiDeleteBinLine } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function UserPreview({ firstName, lastName }: { firstName: string, lastName: string }) {
  return (
      <div className="flex items-center">
        <Avatar className="mr-3 border-2 border-gray-300">
          <AvatarFallback>{firstName.charAt(0)}{lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className={"text-sm font-bold"}>
          {firstName} {lastName.toUpperCase()}
        </span>
        {/* <div className={"ml-5"}>
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Joueur</SelectItem>
              <SelectItem value="dark">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
  )
}