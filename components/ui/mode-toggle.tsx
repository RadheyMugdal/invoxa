"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { IconMoon, IconSun } from "@tabler/icons-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <IconSun
        className="h-6 w-[1.3rem] dark:hidden"
      />
      <IconMoon
        className="hidden h-6 w-[1.3rem] dark:block"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
