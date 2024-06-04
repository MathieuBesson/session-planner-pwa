"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  const getColorFromType = (type: string) => {
    switch (type) {
      case "danger":
        return "bg-red-500 text-white"
      case "success":
        return "bg-green-500 text-white"
      case "info":
        return "bg-blue-500 text-white"
      default:
        return "bg-white text-black"
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, typeCustom, ...props }) {
        return (
          <Toast key={id} {...props} className={`${getColorFromType(typeCustom)}`}>
            <div className="grid gap-1">
              {title && <ToastTitle className="text-md">{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className={`${getColorFromType(typeCustom)}`} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
