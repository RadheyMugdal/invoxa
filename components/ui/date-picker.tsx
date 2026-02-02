"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IconCalendar } from "@tabler/icons-react"

interface DatePickerProps {
  id?: string
  label?: string
  value?: string
  onChange: (date: string) => void
  placeholder?: string
  className?: string
  orientation?: "vertical" | "responsive"
}

export function DatePicker({
  id,
  label,
  value,
  onChange,
  placeholder = "Select date",
  className,
  orientation = "vertical",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  // Update local state when value prop changes
  React.useEffect(() => {
    setDate(value ? new Date(value) : undefined)
  }, [value])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      // Format date as YYYY-MM-DD for input compatibility
      const formattedDate = selectedDate.toISOString().split('T')[0]
      onChange(formattedDate)
    } else {
      onChange("")
    }
    setOpen(false)
  }

  return (
    <Field className={className} orientation={orientation}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="w-full justify-start font-normal"
          >
            <IconCalendar className="mr-2 size-4" />
            {date ? date.toLocaleDateString() : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
