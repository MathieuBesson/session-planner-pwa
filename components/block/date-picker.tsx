import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { MdOutlineCalendarMonth } from "react-icons/md"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar } from "../ui/calendar"

interface DatePickerProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date | undefined) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <MdOutlineCalendarMonth size={20} className="mr-2" />
          {value ? format(value, "PPP", { locale: fr }) : <span>Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateChange}
          initialFocus
          locale={fr}
        />
      </PopoverContent>
    </Popover>
  );
}