import DatePicker from "@/components/block/date-picker";
import DayTimeInput from "@/components/block/day-time-input";
import InputIcon from "@/components/block/input-icon";
import UserPreview from "@/components/block/user-preview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from "next/router";
import { FaPlusMinus } from "react-icons/fa6";
import { LuAlarmCheck } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdOutlinePlace } from "react-icons/md";

export default function UsersEditPage() {
    const router = useRouter()

    return (
        <div>
            <div className="flex items-center mb-4">
                <button onClick={() => router.back()}>
                    <MdKeyboardArrowLeft size={50} />
                </button>
                <h1 className={"text-2xl font-bold"}>Utilisateurs</h1>
            </div>
            <Card className={"w-full max-w-md flex flex-col sm:flex-row px-4 py-2 mb-4"} >
                <UserPreview />
            </Card>
        </div>
    );
}