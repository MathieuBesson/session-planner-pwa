import DatePicker from "@/components/block/date-picker";
import DayTimeInput from "@/components/block/day-time-input";
import InputIcon from "@/components/block/input-icon";
import UserPreview from "@/components/block/user-preview";
import { useUpdateUser, useUsers } from "@/components/hooks/api-request";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { Roles } from "@/enums/roles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { LuAlarmCheck } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdOutlinePlace } from "react-icons/md";

const UsersEditPage: React.FC = () => {
    const router = useRouter()
    const { data: users } = useUsers();
    const { data: userUpdated, updateUser, error: errorUpdate } = useUpdateUser();
    const { toast } = useToast()

    const roleKeys = Object.keys(Roles).filter((key) => isNaN(Number(key)));
    const handleRoleChange = (value: string, userId: number) => {
        const newRoleId = parseInt(value);
        updateUser(userId, { roleId: newRoleId });
    };

    useEffect(() => {
        if (errorUpdate) {
            toast({
                typeCustom: "danger",
                title: "Erreur de modification",
                description: errorUpdate,
            })
        }
    }, [errorUpdate])

    useEffect(() => {
        if (userUpdated !== null && !userUpdated?.error) {
            toast({
                typeCustom: "success",
                title: "Super !",
                description: "Utilisateur mis à jour avec succès",
            })
        }
    }, [userUpdated])

    return (
        <div>
            <div className="flex items-center mb-4">
                <button onClick={() => router.back()}>
                    <MdKeyboardArrowLeft size={50} />
                </button>
                <h1 className={"text-2xl font-bold"}>Utilisateurs</h1>
            </div>
            <Card className={"w-full m-auto gap-3 max-w-sm flex flex-col px-4 py-2 mb-4"} >

                {users?.map(user =>
                    <div className="flex">
                        <UserPreview key={user.id} firstName={user.firstName} lastName={user.lastName} />
                        <div className={"ml-5"}>
                            <Select
                                defaultValue={user.roleId.toString()}
                                onValueChange={(value) => handleRoleChange(value, user.id)}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Rôle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roleKeys.map((key, id) => (
                                        <SelectItem value={id.toString()}>{key}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default UsersEditPage;